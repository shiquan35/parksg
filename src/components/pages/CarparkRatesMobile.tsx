import { useState } from "react";
import { createStyles, Table, ScrollArea, Text, Title } from "@mantine/core";

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

const CarparkRatesMobile = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const centralCarparks: string[] = [
    "Block 270, 271 Albert Centre",
    "Block 232 Bras Basah Complex",
    "Block 665 Tekka Centre",
    "Block 269, 269A, 269B Cheng Yan Court",
    "Block 1 The Pinnacle @ Duxton",
    "Block 531A Upper Cross Street",
    "Block 333 Kreta Ayer Road",
    "Block 334 Kreta Ayer Road",
    "Block 334 Kreta Ayer Road",
    "Block 33 Park Crescent",
    "Block 4 Sago Lane",
    "Block 10 Selegie Road",
    "Block 8, 9 Selegie Road",
    "Tanjong Pagar Plaza",
    "Block 34 Upper Cross Street",
    "Block 261, 262, 264 Waterloo Centre",
  ];

  const rows = centralCarparks.map((row) => (
    <tr key={row}>
      <td>{row}</td>
    </tr>
  ));

  return (
    <>
      <Title order={3} sx={{ margin: 10, marginBottom: 2 }}>
        {" "}
        Rates for HDB Carparks Only
      </Title>
      <Text fz="xs" sx={{ margin: 10, marginTop: 0 }}>
        For shopping mall carparks, please refer to their respective websites
      </Text>
      <Table sx={{ width: 250, margin: 10 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Outside Central Area</th>
            <th>Within Central Area</th>
          </tr>
        </thead>
        <tbody>
          <td>$0.60 per half-hour</td>
          <td>
            $1.20 per half-hour (7:00am to 5:00pm, Mondays to Saturdays) $0.60
            per half hour (Other hours)
          </td>
        </tbody>
      </Table>
      <br></br>
      <Text fz="md" sx={{ margin: 10 }}>
        Carparks designated within Central Areas are as follows:{" "}
      </Text>
      <ScrollArea
        sx={{ height: 400 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ width: 250 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Central Carpark Locations</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default CarparkRatesMobile;
