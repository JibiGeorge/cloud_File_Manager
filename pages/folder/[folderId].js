import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { ParentFolderIdContext } from "../../context/ParentFolderIdContext";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../config/firebaseConfig";
import { useSession } from "next-auth/react";
import FolderList from "../../components/Folder/FolderList";
import { ShowToastContext } from "../../context/showToastContext";
import FileList from "../../components/File/FileList";

const FolderDetails = () => {
  const router = useRouter();
  const db = getFirestore(app);
  const [folderList, setFolderList] = useState([]);
  const [fileList, seFileList] = useState([]);
  const { data: session } = useSession();
  const { showToastMessage, setToastMessage } = useContext(ShowToastContext);

  const { name, id } = router.query;
  const { parentFolderID, setParentFolderID } = useContext(
    ParentFolderIdContext
  );

  useEffect(() => {
    setParentFolderID(id);
    if (session) {
      getFolderList();
      getFilesList();
    }
  }, [id, session, showToastMessage]);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("createdBy", "==", session.user.email),
      where("parentFolderID", "==", id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, "=>", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };

  const getFilesList = async () => {
    seFileList([]);
    const q = query(
      collection(db, "files"),
      where("createdBy", "==", session.user.email),
      where("parentFolderId", "==", id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      seFileList((fileList) => [...fileList, doc.data()]);
    });
  };
  return (
    <div className="p-5">
      <SearchBar />
      <h2 className="text-[20px] font-bold mt-5">{name}</h2>
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
};

export default FolderDetails;
