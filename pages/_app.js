import { useState } from "react";
import CreateFolderModel from "../components/Folder/CreateFolderModel";
import SideNavBar from "../components/SideNavBar";
import Toast from "../components/Toast";
import { ShowToastContext } from "../context/showToastContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ParentFolderIdContext } from "../context/ParentFolderIdContext";
import Storage from "../components/Storage/Storage";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showToastMessage, setToastMessage] = useState();
  const [parentFolderID, setParentFolderID] = useState();
  return (
    <SessionProvider session={session}>
      <ParentFolderIdContext.Provider
        value={{ parentFolderID, setParentFolderID }}
      >
        <ShowToastContext.Provider
          value={{ showToastMessage, setToastMessage }}
        >
          <div className="flex">
            <SideNavBar />
            <div
              className="grid grid-cols-1
        md:grid-cols-3 w-full"
            >
              <div className="col-span-2 w-full">
                <Component {...pageProps} />
              </div>
                <Storage />
            </div>
          </div>
          {showToastMessage ? <Toast msg={showToastMessage} /> : null}
        </ShowToastContext.Provider>
      </ParentFolderIdContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
