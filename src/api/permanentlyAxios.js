import { client } from "../api/client";

// 수강과목 불러오기
export const getSubjectInfo = async ({
  selectCate,
  setSubjectList,
  setErrorInfo,
}) => {
  try {
    const res = await client.get(
      `/admin/student/dropbox-category?iclassification=${selectCate}`,
    );
    const result = await res.data;
    setSubjectList(result.res);
    return result;
  } catch (error) {
    const { response } = error;
    const { status } = response;
    if (response) {
      switch (status) {
        case 500:
          setErrorInfo(`[${status}Error] 서버 내부 오류`);
          break;
        case 401:
          setErrorInfo(
            `[${status}Error] 로그인 시간이 만료되었습니다. 로그아웃 후 재접속 해주세요.`,
          );
          break;

        default:
          setErrorInfo("네트워크 오류 또는 서버 응답이 없습니다.");
      }
    } else {
      throw new Error("Network Error");
    }
  }
};

// 영구삭제 가능한 리스트 불러오기
export const getCompleteDeleteList = async ({
  setListData,
  setCount,
  page,
  resultUrl,
  setNothing,
  setErrorInfo,
}) => {
  try {
    const res = await client.get(
      `/admin/student/oneyearago?page=${page}&size=10&sort=istudent%2CASC&${resultUrl}`,
    );

    const result = await res.data;
    setListData(result.vo);
    setCount(result.page.idx);
    setNothing(false);
    if (result.vo.length === 0) {
      setNothing(true);
      // console.log("결과 없어요");
    }
    return result;
  } catch (error) {
    const { response } = error;
    const { status } = response;
    if (response) {
      switch (status) {
        case 500:
          setErrorInfo(`[${status}Error] 서버 내부 오류`);
          break;
        case 401:
          setErrorInfo(
            `[${status}Error] 로그인 시간이 만료되었습니다. 로그아웃 후 재접속 해주세요.`,
          );
          break;

        default:
          setErrorInfo("네트워크 오류 또는 서버 응답이 없습니다.");
      }
    } else {
      throw new Error("Network Error");
    }
  }
};

// DELETE
export const deleteCompleteStudent = async ({
  clickItems,
  setErrorInfo,
  setClickItems,
}) => {
  try {
    const queryString = clickItems.map(item => `istudent=${item}`).join("&");
    const res = await client.delete(`/admin/student/oneyearago?${queryString}`);
    const result = res.data;
    console.log("완전 삭제성공", result);
    setErrorInfo("영구 삭제가 완료되었습니다.");
    return result;
  } catch (error) {
    const { response } = error;
    const { status } = response;
    if (response) {
      switch (status) {
        case 500:
          setErrorInfo(`[${status}Error] 서버 내부 오류`);
          break;
        case 401:
          setErrorInfo(
            `[${status}Error] 로그인 시간이 만료되었습니다. 로그아웃 후 재접속 해주세요.`,
          );
          break;

        default:
          setErrorInfo("네트워크 오류 또는 서버 응답이 없습니다.");
      }
    } else {
      throw new Error("Network Error");
    }
    return;
  }
};
