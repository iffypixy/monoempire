import {Icons} from "@shared/ui";

import {Cell} from "../types";

export const map: Cell[] = [
    {
        type: "START",
        Icon: Icons.Start,
    },
    {
        type: "BILLBOARD-TILE",
        price: 50,
        Icon: Icons.Companies.Chanel,
    },
    {type: "RIVAL-TOWER-TAX", Icon: Icons.RivalTax},
    {
        type: "BILLBOARD-TILE",
        price: 50,
        Icon: Icons.Companies.Boss,
    },
    {type: "EMPIRE-CARD", Icon: Icons.Empire},
    {
        type: "BILLBOARD-TILE",
        price: 100,
        Icon: Icons.Companies.Adidas,
    },
    {type: "CHANCE-CARD", Icon: Icons.Chance},
    {
        type: "BILLBOARD-TILE",
        price: 100,
        Icon: Icons.Companies.Puma,
    },
    {
        type: "BILLBOARD-TILE",
        price: 100,
        Icon: Icons.Companies.Nike,
    },
    {type: "JAIL", Icon: Icons.Handcuffs},
    {
        type: "BILLBOARD-TILE",
        price: 150,
        Icon: Icons.Companies.Instagram,
    },
    {
        type: "BILLBOARD-TILE",
        price: 150,
        Icon: Icons.Companies.Facebook,
    },
    {type: "ELECTRIC-COMPANY", Icon: Icons.Electricity},
    {
        type: "BILLBOARD-TILE",
        price: 150,
        Icon: Icons.Companies.Twitter,
    },
    {
        type: "BILLBOARD-TILE",
        price: 150,
        Icon: Icons.Companies.Sprite,
    },
    {type: "CHANCE-CARD", Icon: Icons.Chance},
    {
        type: "BILLBOARD-TILE",
        price: 200,
        Icon: Icons.Companies.Cola,
    },
    {
        type: "BILLBOARD-TILE",
        price: 200,
        Icon: Icons.Companies.Pepsi,
    },
    {type: "FREE-PARKING", Icon: Icons.Parking},
    {
        type: "BILLBOARD-TILE",
        price: 250,
        Icon: Icons.Companies.TurkishAirlines,
    },
    {
        type: "BILLBOARD-TILE",
        price: 250,
        Icon: Icons.Companies.QatarAirways,
    },
    {type: "CHANCE-CARD", Icon: Icons.Chance},
    {
        type: "BILLBOARD-TILE",
        price: 250,
        Icon: Icons.Companies.Emirates,
    },
    {
        type: "BILLBOARD-TILE",
        price: 250,
        Icon: Icons.Companies.KFC,
    },
    {type: "EMPIRE-CARD", Icon: Icons.Empire},
    {
        type: "BILLBOARD-TILE",
        price: 300,
        Icon: Icons.Companies.McDonalds,
    },
    {
        type: "BILLBOARD-TILE",
        price: 300,
        Icon: Icons.Companies.BurgerKing,
    },
    {type: "GO-TO-JAIL", Icon: Icons.Police},
    {
        type: "BILLBOARD-TILE",
        price: 350,
        Icon: Icons.Companies.Mercedes,
    },
    {
        type: "BILLBOARD-TILE",
        price: 350,
        Icon: Icons.Companies.Audi,
    },
    {type: "WATER-WORKS", Icon: Icons.Water},
    {
        type: "BILLBOARD-TILE",
        price: 350,
        Icon: Icons.Companies.Ford,
    },
    {type: "CHANCE-CARD", Icon: Icons.Chance},
    {
        type: "BILLBOARD-TILE",
        price: 400,
        Icon: Icons.Companies.OnePlus,
    },
    {type: "POWER-TAX", Icon: Icons.Tax},
    {
        type: "BILLBOARD-TILE",
        price: 400,
        Icon: Icons.Companies.Apple,
    },
];

export const getCellSide = (cell: number) =>
    [
        cell >= 0 && cell <= 9,
        cell >= 9 && cell <= 18,
        cell >= 18 && cell <= 27,
        cell >= 27 && cell <= 36,
    ].indexOf(true);
