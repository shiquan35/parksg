import { useState, useEffect } from "react";
import axios from "axios";
import "./MarkerStyles/markerStyles.css";
import { useMediaQuery } from "@mantine/hooks";
import { DisplayMapMobile } from "./DisplayMapMobile";
import { DisplayMapDesktop } from "./DisplayMapDesktop";

type CarparkDetails = {
  Agency: string;
  Area: string;
  AvailableLots: number;
  CarParkID: string;
  Development: string;
  Location: string;
  LotType: string;
};

type CurrentLocation = {
  longitude: number;
  latitude: number;
  zoom: number;
};

const Homepage = () => {
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState<CarparkDetails[]>([]);

  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(
    null!
  );

  const mobile = useMediaQuery("(max-width: 413px)");

  const success = (pos: any): void => {
    const crd = pos.coords;
    setCurrentLocation({
      longitude: crd.longitude,
      latitude: crd.latitude,
      zoom: 15,
    });
  };

  const error = (err: any): void => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    window.location.reload(); // reload page if error
  };

  const options: { enableHighAccuracy: boolean; timeout: number } = {
    enableHighAccuracy: true,
    timeout: 5000,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    axios
      .get("https://fierce-puce-shark.cyclic.app/")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        {currentLocation &&
          (mobile ? (
            <DisplayMapMobile
              lotInfo={ltaCarparkAvail}
              currLocation={currentLocation}
            />
          ) : (
            <DisplayMapDesktop
              lotInfo={ltaCarparkAvail}
              currLocation={currentLocation}
            />
          ))}
      </div>
    </>
  );
};

export default Homepage;
