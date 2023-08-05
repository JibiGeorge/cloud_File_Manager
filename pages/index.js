import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FolderList from "../components/Folder/FolderList";
import FileList from "../components/File/FileList";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import { ParentFolderIdContext } from "../context/ParentFolderIdContext";
import { ShowToastContext } from "../context/showToastContext";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);

  const [folderList, setFolderList] = useState([]);
  const [fileList, seFileList] = useState([]);
  const { parentFolderID, setParentFolderID } = useContext(
    ParentFolderIdContext
  );
  const { showToastMessage, setToastMessage } = useContext(ShowToastContext);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getFolderList();
      getFilesList();
      console.log("session", session.user);
    }
    setParentFolderID(0);
  }, [session, showToastMessage]);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("createdBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };

  const getFilesList = async () => {
    seFileList([]);
    const q = query(
      collection(db, "files"),
      where("createdBy", "==", session.user.email)
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
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}
