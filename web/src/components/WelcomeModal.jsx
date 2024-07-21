import React, { useEffect, useState, useMemo } from 'react'
import useToast from '../toast/useToast';
import ProfileService from '../services/profile.service';
import { Button, TextInput, Label, Modal, Popover, Select } from "flowbite-react";
import { RiQuestionLine } from "react-icons/ri";

function WelcomeModal() {

    const [showWelcomeScreen, setShowWelcomeScreen] = useState();
    const [createDisplayName, setCreateDisplayName] = useState();
    const [profileVisibility, setProfileVisibility] = useState("hidden");
    const [contentIndex, setContentIndex] = useState(0);

    const toast = useToast(4000);

    const displayNamePopoverContent = (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Help</h3>
            </div>
            <div className="px-3 py-2">
                <p>A display name will be used on your profile page that lists all your books. A profile page can be private or public. Display name and visibility of the profile page can be changed at any time.</p>
                <p>Your display name will also be used for a link to your profile page if you have set it to public.</p>
            </div>
        </div>
    )
    
    useEffect(() => {
      getProfileData()
    }, [])
    

    /* Note: this is checks if a profile exists or not, at the moment it will indicate if a welcome screen will show or not.
    * This will unfortuantly run every time the user goes to the /library page. Maybe we should store some value in the local storage
    * so it does not do a network request every time?
    */
    const getProfileData = () => {
        ProfileService.get().then(
            response => {
                setShowWelcomeScreen(false);
            },
            error => {
                if (error.response) {
                    if (error.response.status == 404) {
                        setShowWelcomeScreen(true);
                    }
                }
            }
        )
    }

    const handleCreateProfile = (e) => {
        e.preventDefault();
        ProfileService.create({"display_name": createDisplayName, "visibility": profileVisibility}).then(
            response => {
                toast("success", response.data.message);
                setContentIndex(1);
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                toast("error", resMessage);
            }
        )
    }

    return (
        <>
        {showWelcomeScreen &&
            <Modal show={showWelcomeScreen}>
                <Modal.Body>
                    {contentIndex == 0 &&
                    <form className="flex flex-col gap-4" onSubmit={handleCreateProfile}>
                        <div className="format lg:format-lg">
                            <h3>Welcome! 🎉</h3>
                            <p>We are so happy to have you here! To get started tracking all the books you are reading you first need to choose a display name.</p>
                        </div>
                        <div>
                            <div className="mb-2 flex flex-row gap-2 items-center">
                                <Label htmlFor="displayname" value="Display name" />
                                <Popover trigger="hover" content={displayNamePopoverContent}>
                                    <span><RiQuestionLine /></span>
                                </Popover>
                            </div>
                            <TextInput id="displayname" type="text" required value={createDisplayName} onChange={(e) => setCreateDisplayName(e.target.value)} />
                            <br />
                            <div className="mb-2 block">
                                <Label htmlFor="visiblity" value="Visiblity" />
                            </div>
                            <Select id="visiblity" required value={profileVisibility} onChange={(e) => setProfileVisibility(e.target.value)}>
                                <option value="hidden">Hidden</option>
                                <option value="public">Public</option>
                            </Select>
                        </div>         
                        <Button type="submit" disabled={!createDisplayName}>Next</Button>
                    </form>
                    }
                    {contentIndex == 1 &&
                        <div className="format lg:format-lg flex flex-col items-center text-center">
                            <h3>You are all set!</h3>
                            <p>Why don't you start by adding some of your favorites books to your lists? It's super simple!</p>
                            <Button onClick={() => setShowWelcomeScreen(false)}>Close</Button>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        }
        </>
    )
}

export default WelcomeModal