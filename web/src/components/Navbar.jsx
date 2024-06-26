import React, {useState} from 'react';
import SearchBar from '../components/SearchBar'
import { Sidebar, Modal } from 'flowbite-react'
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { FaPlug } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function NavigationMenu() {
    const [sidebarState, setSidebarState] = useState(true);
    const [openSearchModal, setOpenSearchModal] = useState(false);

    return (
        <>
        <Sidebar collapsed={sidebarState}>
          <Sidebar.Logo as={Link} href="/" img="/icon.svg" className="mr-3 h-6 sm:h-8" alt="Logo">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">minimal reading</span>
          </Sidebar.Logo>
            <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    {sidebarState ? (
                      <Sidebar.Item icon={FaMagnifyingGlass} onClick={() => setOpenSearchModal(true)}>Search</Sidebar.Item>
                    ) :( 
                    <Sidebar.Item><SearchBar></SearchBar></Sidebar.Item>
                    )}
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Link to="/">
                      <Sidebar.Item icon={FaBook}><span className="font-semibold">My Library</span></Sidebar.Item>
                    </Link>
                    <Link to="/profile">
                      <Sidebar.Item icon={FaCircleUser }><span>Profile</span></Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={FaPlug }><span>Integrations</span></Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Sidebar.Item icon={sidebarState ? TbLayoutSidebarRightCollapseFilled : TbLayoutSidebarLeftCollapseFilled } onClick={() => setSidebarState(!sidebarState)}>
                    {sidebarState ? (
                      <span>Expand</span>
                    ): (
                      <span>Collapse</span>
                    )}
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
        <Modal dismissible show={openSearchModal} onClose={() => setOpenSearchModal(false)} position={"top-center"}>
            <Modal.Body>
                <SearchBar />
            </Modal.Body>
        </Modal>
        </>
    )
}

export default NavigationMenu