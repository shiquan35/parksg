import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { StylesComponents, StylesLayout } from "./LayoutStyles";
import { Navigationbar } from "./SideBar";
import { NavigationbarMobile } from "./SideBarMobile";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const mobile = useMediaQuery("(max-width: 900px)");
  return (
    <StylesLayout>
      {mobile ? <NavigationbarMobile /> : <Navigationbar />}
      <StylesComponents>{props.children}</StylesComponents>
    </StylesLayout>
  );
};

export default Layout;
