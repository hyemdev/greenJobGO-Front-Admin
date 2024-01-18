import React, { useState } from "react";
import NoImage from "../../assets/NoImage.jpg";
import {
  patchSendSaved,
} from "../../api/portfolioAxios";
import ConfirmModal from "../ConfirmModal";
import { CheckToMainSt } from "../../styles/PortfolioStyle";
import SaveItemCheckbox from "./SaveItemCheckbox";

// // 메인클릭 정보 저장 recoil

const SaveItemBox = ({ item, fetchData }) => {
  const [savedItemNum, setSavedItemNum] = useState([]);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState();


  // 보관함 리스트 recoil을 읽어오자
  // const savedListRead = useRecoilValue(readsavedListItems);

  // 이미지 없을 때 error처리
  const onImgError = e => {
    e.target.src = NoImage;
  };

  // 보관을 취소한다
  const handleSaveCancel = item => {
    setSavedItemNum(item);
    setCancelModalOpen(true);
  };
  // 보관취소 컨펌
  const handleCancelConfirm = async () => {
    try {
      let update = 0;
      setIsSaved(update);
      await patchSendSaved({ savedItemNum, isSaved: update });
      await fetchData();
      setCancelModalOpen(false);
    } catch (error) {
      console.log("보관실패", error);
    }
  };

  console.log("보관리스트 리랜더링~");

  return (
    <div className="pf-box">
      <div className="saved-img">
        <img src={`${item.img}`} alt={item.studentName} onError={onImgError} />
        {item.companyMainYn === 1 ? <div className="isMainDim"></div> : null}
        <ul className="thumb-right">
          {item.huntJobYn === 1 && (
            <li>
              <img
                src={`${process.env.PUBLIC_URL}/assets/got-a-job.png`}
                alt="got-a-job"
                className="job-yes-icon"
                onError={onImgError}
              />
            </li>
          )}
        </ul>
      </div>
      <CheckToMainSt>
        <SaveItemCheckbox
          item={item}
          handleSaveCancel={handleSaveCancel}
          fetchData={fetchData}
        />
      </CheckToMainSt>
      {/* 보관취소모달 */}
      {cancelModalOpen && (
        <ConfirmModal
          open={cancelModalOpen}
          close={() => setCancelModalOpen(false)}
          onConfirm={handleCancelConfirm}
          onCancel={() => setCancelModalOpen(false)}
        >
          <span>해당 포트폴리오 보관을 취소 하시겠습니까?</span>
        </ConfirmModal>
      )}
    </div>
  );
};

export default SaveItemBox;
