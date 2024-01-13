import React, {useEffect, useState} from "react";
import styles from './Layout.module.scss';
import {Outlet, useNavigate} from "react-router-dom";
import ProductIcon from '../../../assets/product-icon.png';
import UserIcon from '../../../assets/user-icon.png';
import PostIcon from '../../../assets/post-icon.png';
import TodoIcon from '../../../assets/todo-icon.png';
import {observer} from "mobx-react";
import SignInService from "../../../services/SigInService";


const Layout = observer(() => {
    const navigate = useNavigate();
    const sideBarElements = [
        {iconSrc: ProductIcon, text: 'Products'},
        {iconSrc: UserIcon, text: 'Users'},
        {iconSrc: PostIcon, text: 'Posts'},
        {iconSrc: TodoIcon, text: 'Todos'},
    ];
    const [selected, setSelected] = useState(0);

    const handleSideBarElementClick = (
        event: React.MouseEvent<HTMLSpanElement>,
        index: number,
    ) => {
        const textElement: HTMLSpanElement = event.currentTarget
            .childNodes[1] as HTMLSpanElement;
        setSelected(index);
        console.log(selected)
        navigate(`/main/${textElement.innerText.toLowerCase()}`);
    };


    return <div className={styles.layoutContainer}>

        <div className={styles.layoutSideBar}>
            <span className={styles.layoutSideBarHeader}>Admin Panel</span>
            <div className={styles.sideBarElementsContainer}>
                {sideBarElements.map((element, index) => (
                    <span
                        key={index}
                        className={`${styles.sideBarElement} ${
                            selected === index ? styles.selected : ''
                        }`}
                        onClick={(event) => handleSideBarElementClick(event, index)}
                    >
                  <span>
                    <img
                        className={styles.sideBarElementIcon}
                        src={element.iconSrc}
                        alt={`${element.text} Icon`}
                    />
                  </span>
                  <span className={styles.sideBarElementText}>
                    {element.text}
                  </span>
                </span>
                ))}
            </div>
        </div>
        <div className={styles.layoutContentContainer}>
            <span className={styles.layoutContentHeader}>
                <span
                    className={styles.layoutContentName}>{sideBarElements[selected] ? sideBarElements[selected].text : "Text"}</span>
                <span className={styles.adminBadgeContainer}>
                    <span className={styles.adminBadgeIconContainer}>
                    <img src={SignInService.getCurrentUser()["image"]} alt=""
                         className={styles.adminBadgeIcon}/>
                    </span>
                    <div className={styles.adminBadgeTextContainer}>
                        <span
                            className={styles.adminBadgeName}>{SignInService.getCurrentUser()["firstName"] + ' ' + SignInService.getCurrentUser()["lastName"]}</span>
                        <span className={styles.adminBadgeStatus}>Admin</span>
                    </div>
                </span>
            </span>
            <Outlet/>
        </div>
    </div>;
});
export default Layout;