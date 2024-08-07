import React, { useState, useEffect } from 'react'
import { Button, Modal, Label, TextInput, Select} from "flowbite-react";
import BooksService from '../services/books.service';
import useToast from '../toast/useToast';

function AddToReadingListButton(props) {
    const [openModal, setOpenModal] = useState(false);
    const [readingStatus, setReadingStatus] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [totalPages, setTotalPages] = useState();
    const toast = useToast(4000);

    const handleSave = () => {
        var arr = {}
        arr.title = props.data?.title;
        arr.isbn = props.isbn;
        arr.author = props.data?.author_name?.[0]; //Authors object from the API can have more than one object inside.. fix this later by flattening and getting a list of all authors names.
        if (props.data?.description) {
            arr.description = props.data?.description;
        }
        if (readingStatus) {
            arr.reading_status = readingStatus;
        }
        
        if (currentPage) {
            arr.current_page = currentPage;
        }

        if (totalPages) {
            arr.total_pages = totalPages;
        }

        BooksService.add(arr).then(
            response => {
                toast("success", response.data.message);
                setOpenModal(false);
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

    useEffect(() => {
      setTotalPages(props.data?.number_of_pages)
    }, [props.data])
    

    return (
        <div>
            <Button onClick={() => setOpenModal(true)}>Add to list</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add book to list</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500">Book title: {props.data?.title}</p>
                        <p className="text-base leading-relaxed text-gray-500">ISBN: {props.isbn}</p>
                        <div className="mb-2 block">
                            <Label htmlFor="readingStatus" value="Reading Status" />
                        </div>
                        <Select id="readingStatus" required value={readingStatus} onChange={(e) => setReadingStatus(e.target.value)}>
                            <option>To be read</option>
                            <option>Currently reading</option>
                            <option>Read</option>
                        </Select>

                        <div className="mb-2 block">
                            <Label htmlFor="currentPage" value="Current page" />
                        </div>
                        <TextInput id="currentPage" type="text" placeholder="0" value={currentPage} onChange={(e) => setCurrentPage(e.target.value)} />

                        <div className="mb-2 block">
                            <Label htmlFor="totalPages" value="Total pages" />
                        </div>
                        <TextInput id="totalPages" type="text" placeholder="0" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={() => handleSave()}>Save</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddToReadingListButton