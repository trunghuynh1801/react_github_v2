// DeleteButton.js
import React, { useState } from "react";
import axios from "axios";

const DeleteButton = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await axios.delete(
        "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/REACT_delete",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Handle success, e.g., show a success message, update state, etc.
        console.log("Items deleted successfully");
      } else {
        // Handle error, e.g., show an error message, log the error, etc.
        console.error("Failed to delete items");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred while deleting", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete All"}
    </button>
  );
};

export default DeleteButton;
