import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { app } from "../../config/firebaseConfig";
import { ParentFolderIdContext } from "../../context/ParentFolderIdContext";
import { ShowToastContext } from "../../context/showToastContext";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { async } from "@firebase/util";

const UploadFileModal = ({ closeModal }) => {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const { parentFolderID, setParentFolderID } = useContext(
    ParentFolderIdContext
  );
  const { showToastMessage, setToastMessage } = useContext(ShowToastContext);
  const storage = getStorage(app);

  const onFileUpload = async (file) => {
    const fileRef = ref(storage, "file/" + file.name);

    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log("uploaded file");
      })
      .then((res) => {
        getDownloadURL(fileRef).then(async (download) => {
          await setDoc(doc(db, "files", Date.now().toString()), {
            name: file.name,
            type: file.name.split(".")[1],
            size: file.size,
            modifiedAt: file.lastModified,
            createdBy: session.user.email,
            parentFolderId: parentFolderID,
            imageUrl: download,
          });
          closeModal(true);
          setToastMessage("File Uploded");
        });
      });
  };
  return (
    <div>
      <form
        method="dialog"
        className="modal-box p-9 items-center w-[360px] bg-white"
      >
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3 bg-white"
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 hover:bg-[#cbc8c8] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-[#efeded]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => onFileUpload(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadFileModal;
