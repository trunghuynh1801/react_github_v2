import React, { useState } from "react";
import axios from "axios";

const DeleteButton = ({ itemId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await axios.delete(
        "https://us-east-1.aws.data.mongodb-api.com/app/agg_func-voayj/endpoint/REACT_delete",
        {
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers needed for authentication or other purposes
          },
          // You may need to adjust the data based on the API requirements
          data: { itemId },
        }
      );

      if (response.status === 200) {
        // Handle success, e.g., show a success message, update state, etc.
        console.log("Item deleted successfully");
      } else {
        // Handle error, e.g., show an error message, log the error, etc.
        console.error("Failed to delete item");
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
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
