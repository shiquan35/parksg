import { useState } from "react";
import { createStyles, Table, ScrollArea, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

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

  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

// rendering the list of carparks shown on the map
export function List({ lotInfo, viewState }: IAppProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  // const carparkInfo = lotInfo.map((lot) => {
  //   if (
  //     Math.sqrt(
  //       (viewState.latitude - Number(lot.Location.split(" ")[0])) ** 2 +
  //         (viewState.longitude - Number(lot.Location.split(" ")[1])) ** 2
  //     ) <= 0.0035 &&
  //     lot.LotType === "C"
  //   ) {
  //     return (
  //       <tr key={lot.CarParkID}>
  //         <td>{lot.Development}</td>
  //         <td>{lot.AvailableLots}</td>
  //       </tr>
  //     );
  //   }
  // });

  const carparkInfo = lotInfo
    .filter((lot) => {
      const [lat, long] = lot.Location.split(" ").map(Number);
      const distance = Math.sqrt(
        (viewState.latitude - lat) ** 2 + (viewState.longitude - long) ** 2
      );
      return distance <= 0.0035 && lot.LotType === "C";
    })
    .map((lot) => (
      <tr key={lot.CarParkID}>
        <td>{lot.Development}</td>
        <td>{lot.AvailableLots}</td>
      </tr>
    ));

  return (
    <>
      <Title order={1} sx={{ margin: 10, marginLeft: 5 }}>
        Nearby Carparks
      </Title>
      <ScrollArea
        sx={{ height: 400 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 500 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Location</th>
              <th>Available Lots</th>
            </tr>
          </thead>
          <tbody>{carparkInfo}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
