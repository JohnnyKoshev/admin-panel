import React from "react";
import styles from "./Products.module.scss";
import {observer} from "mobx-react";
import Content from "../Content/Content";

const Products = observer(() => {
    return <Content/>
});

export default Products;