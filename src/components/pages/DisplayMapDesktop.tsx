import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import carparkMarker from "./MarkerStyles/carparkMarker.png";
import carparkMarker from "./MarkerStyles/carparkMarker.png";
import GeocoderControl from "./GeocoderFiles/geocoder-control";
import { v4 as uuid } from "uuid";
import { List } from "./List";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { useAuth } from "../firebaseContext/FirebaseContext";
import { Modal, Table, Text, Title } from "@mantine/core";
import hdb from "./hdb.json";
import { useNavigate } from "react-router-dom";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export interface IAppProps {
  lotInfo: {
    Agency: string;
    Area: string;
    AvailableLots: number;
    CarParkID: string;
    Development: string;
    Location: string;
    LotType: string;
  }[];

  currLocation: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

type LotInfo = {
  Agency: string;
  Area: string;
  AvailableLots: number;
  CarParkID: string;
  Development: string;
  Location: string;
  LotType: string;
};

type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
};

type SavedInfo = {
  userID: string;
  carparkID: string;
  id: string;
};

export function DisplayMapDesktop({ lotInfo, currLocation }: IAppProps) {
  const mapRef: any = React.useRef();
  let navigate = useNavigate();
  const { user } = useAuth();
  const [viewState, setViewState] = React.useState<ViewState>({
    longitude: currLocation.longitude,
    latitude: currLocation.latitude,
    zoom: currLocation.zoom,
  });
  const [saved, setSaved] = useState<SavedInfo[]>([]);
  const userSavedCarparks: string[] = [];
  const [opened, setOpened] = useState(false);
  const [selectedCarpark, setSelectedCarpark] = useState<LotInfo | null>(null);

  const savedCollectionRef = collection(db, "favourites");
  const createSavedInfo = async () => {
    await addDoc(savedCollectionRef, {
      carparkID: selectedCarpark?.CarParkID,
      userID: user?.email,
    });
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  const handleClick = (e: React.MouseEvent) => {
    setOpened(true);
    createSavedInfo();
    updateList();
  };

  // to get the most updated saved information from the user
  const updateList = async () => {
    const data = await getDocs(savedCollectionRef);
    setSaved(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    updateList();
  }, []);

  saved.map((info) => {
    return info.userID === user?.email
      ? userSavedCarparks.push(info.carparkID)
      : null;
  });

  useEffect(() => {
    console.log(lotInfo);
  }, [lotInfo]);

  return (
    <div style={{ margin: "10px" }}>
      <>
        {/* Modal lets user know that they have clicked on the favourites button
      reduces likelihood of them double-clicking  */}
        <Modal
          withCloseButton={false}
          opened={opened}
          onClose={() => setOpened(false)}
        >
          Added to favourites!
        </Modal>
      </>
      <div className="container">
        <div className="mapDesktop">
          <ReactMapGL
            ref={mapRef}
            style={{
              width: "700px",
              height: `700px`,
              border: "2px solid black",
            }}
            {...viewState}
            onMove={(event) => setViewState(event.viewState)}
            mapboxAccessToken={TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {Array.isArray(lotInfo) &&
              lotInfo.map(
                (lot) =>
                  Math.sqrt(
                    (viewState.latitude - Number(lot.Location.split(" ")[0])) **
                      2 +
                      (viewState.longitude -
                        Number(lot.Location.split(" ")[1])) **
                        2
                  ) <= 0.0035 &&
                  lot.LotType === "C" && (
                    <Marker
                      key={uuid()}
                      latitude={Number(lot.Location.split(" ")[0])}
                      longitude={Number(lot.Location.split(" ")[1])}
                    >
                      <button
                        className="markerButton"
                        onClick={(event) => {
                          event.preventDefault();
                          setSelectedCarpark(lot);
                        }}
                      >
                        <img src={carparkMarker} alt="Carpark" />
                      </button>
                    </Marker>
                  )
              )}

            {selectedCarpark && (
              <Popup
                style={{ width: `300px` }}
                longitude={Number(selectedCarpark.Location.split(" ")[1])}
                latitude={Number(selectedCarpark.Location.split(" ")[0])}
                closeOnClick={false}
                onClose={() => setSelectedCarpark(null)}
              >
                <div
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedCarpark(null);
                  }}
                >
                  <Title order={4}>{selectedCarpark.Development}</Title>
                  <Text fw={700} fz="md">
                    Lots available: {selectedCarpark.AvailableLots}
                  </Text>
                  {/* relevant hdb parking info */}
                  {hdb.records.map((cost) =>
                    cost.car_park_no === selectedCarpark?.CarParkID ? (
                      <>
                        <Table>
                          <thead>
                            <tr>
                              <th>Short Term</th>
                              <th>Free Parking</th>
                              <th>Night Parking</th>
                            </tr>
                          </thead>
                          <tbody>
                            <td>{cost.short_term_parking}</td>
                            <td>{cost.free_parking}</td>
                            <td>{cost.night_parking}</td>
                          </tbody>
                        </Table>
                      </>
                    ) : (
                      <></>
                    )
                  )}
                </div>
                <button
                  className="favourite-button"
                  disabled={
                    userSavedCarparks.includes(selectedCarpark.CarParkID)
                      ? true
                      : false
                  }
                  onClick={user === null ? handleRedirect : handleClick}
                >
                  Add to favourite
                </button>
              </Popup>
            )}
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              showAccuracyCircle={false}
            />
            <NavigationControl />
            <GeocoderControl
              position="top-left"
              mapboxAccessToken={TOKEN}
              zoom={16}
            />
          </ReactMapGL>
        </div>
        <div className="listDiv">
          <List lotInfo={lotInfo} viewState={viewState} />
        </div>
      </div>
    </div>
  );
}
