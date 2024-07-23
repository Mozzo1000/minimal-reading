import React, { useEffect, useState } from 'react'
import { Modal, Rating, Button, RangeSlider, TextInput, Tooltip  } from 'flowbite-react'
import useToast from '../../toast/useToast';
import BooksService from '../../services/books.service';

function BookRating(props) {
    const [openModal, setOpenModal] = useState(false);
    const [rangeValue, setRangeValue] = useState(props.rating ? props.rating : 0);
    const [ratingErrorText, setRatingErrorText] = useState();
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

    const toast = useToast(4000);

    const handleRateBook = () => {
        BooksService.edit(props.id, {rating: rangeValue}).then(
            response => {
                toast("success", response.data.message);
                setOpenModal(false);
                props.onSuccess();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setOpenModal(false);
                toast("error", resMessage);
            }
        )
    }

    const handleOpenModal = () => {
        console.log(props.disableGiveRating)
        if(!props.disableGiveRating) {
            setOpenModal(true)
        }
    }

    useEffect(() => {
        if (rangeValue > 5) {
            setRatingErrorText("Rating cannot be more than 5");
            setSaveButtonDisabled(true);
        } else if (rangeValue < 0) {
            setRatingErrorText("Rating cannot be less than 0.");
            setSaveButtonDisabled(true);
        } else {
            setRatingErrorText();
            setSaveButtonDisabled(false);
        }
      }, [rangeValue])

    const rating = () => {
        return (
            <Rating size={props.size} onClick={() => handleOpenModal()} className={`${!props.disableGiveRating ? "hover:bg-gray-100 hover:cursor-pointer":""} w-fit`}>
                <Rating.Star filled={Math.floor(props.rating) >= 1 ? true : false} />
                <Rating.Star filled={Math.floor(props.rating) >= 2 ? true : false} />
                <Rating.Star filled={Math.floor(props.rating) >= 3 ? true : false} />
                <Rating.Star filled={Math.floor(props.rating) >= 4 ? true : false} />
                <Rating.Star filled={Math.floor(props.rating) >= 5 ? true : false} />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{props.rating}</p>
            </Rating>
        )
    }

    return (
        <>
        {props.disableGiveRating ? (
            rating()
        ): (
            <Tooltip content={props.disableGiveRating ? undefined : "Give a rating"}>
                {rating()}
            </Tooltip>
        )}
        
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Rate book</Modal.Header>
            <Modal.Body>
                <p>How many stars would you like to give <strong>{props.title}</strong>?</p>
                <div className="flex flex-row items-center gap-4">
                    <div className="basis-10/12">
                        <RangeSlider min={0} max={5} step={0.5} value={rangeValue} onChange={(e) => setRangeValue(e.target.value)}/>
                    </div>
                    <div className="basis-2/12">
                        <TextInput type="number" min={0} max={5} step={0.5} value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} color={ratingErrorText ? 'failure' : 'gray'} />
                        
                    </div>
                    
                </div>
                <span className="text-red-600 text-sm">
                            {ratingErrorText}
                        </span>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={() => handleRateBook()} disabled={saveButtonDisabled}>Save</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

BookRating.defaultProps = {
    size: "sm",
    disableGiveRating: false,
}

export default BookRating