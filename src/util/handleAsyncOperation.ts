const handleAsyncOperation = (promise: Promise<any>, successCallback: (result: any) => void) => {
    promise
        .then((result) => {
            // api 요청 성공시 setState처리
            // console.log('callbackresult', result);
            console.log(result,'뭐가문제냐');
            successCallback(result);
        })
        .catch((error) => {
            console.log(error, '비동기 작업 실패');
            // 에러 처리 로직을 추가할 수 있습니다.
        });
};

export default handleAsyncOperation;