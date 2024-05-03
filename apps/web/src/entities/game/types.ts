import React from "react";

export type CellType =
    | "START"
    | "BILLBOARD-TILE"
    | "RIVAL-TOWER-TAX"
    | "EMPIRE-CARD"
    | "CHANCE-CARD"
    | "JAIL"
    | "ELECTRIC-COMPANY"
    | "FREE-PARKING"
    | "GO-TO-JAIL"
    | "WATER-WORKS"
    | "POWER-TAX";

export interface Cell {
    type: CellType;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    price?: number;
}
