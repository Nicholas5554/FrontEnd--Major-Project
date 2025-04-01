import React from "react";
import { FlexAlign } from "../../enums/flexAlign";
import { FlexDiractions } from "../../enums/flexDiractions";

type FlexProps = {
    children: React.ReactNode;
    justify: FlexAlign;
    items: FlexAlign;
    diraction: FlexDiractions;
}

const Flex = (props: FlexProps) => {

    const { children, justify, items, diraction } = props;

    return (
        <div className={`flex flex-${diraction} justify-${justify} items-${items}`}>{children}</div>
    )
}

export default Flex;