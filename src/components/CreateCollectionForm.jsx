import React from "react";
import UploadImageFunction from "../components/UploadCollectionImage";
import Button from "@mui/material/Button";

const CreateCollectionForm = () => {
  return (
    <div>
      <p style={{ fontSize: "25px", fontWeight: "bold" }}>Create Collection</p>

      <div>
        <form className="mt-5">
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Title" />
          </div>
          <div className="mt-5">
            <label htmlFor="description">Description</label>
          </div>
          <div>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="95"
              border="1px solid #ccc"
            />
          </div>
          <div className="mt-5">
            <UploadImageFunction />
          </div>
          <div className="text-right mt-5">
            <Button
              type="submit"
              style={{
                padding: "6px 15px",
                fontSize: "16px",
                border: "none",
                borderRadius: "4px",
              }}
              sx={{
                backgroundColor: "#ff7600",
                color: "white",
                "&:hover": {
                  backgroundColor: "#d16002",
                },
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionForm;
