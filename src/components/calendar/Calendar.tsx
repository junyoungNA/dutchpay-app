import { useEffect, useState } from 'react';
import changeDate from '../../util/changeDate';
import OverlayWrapper from '../shared/OverlayWrapper';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { calendarDateState } from '../../atom/calendarDate';
import { kakaoUser } from '../../atom/kakaoUser';
import { groupNameState } from '../../atom/groupName';
import { ROUTES } from '../../route/routes';
import { groupMemberState } from '../../atom/groupMembers';
import { deleteData } from '../../util/api/apiInstance';
import { currentDateState } from '../../atom/currentDate.state';
import { useRouter } from '../../hooks/useRouter';
import CalendarDate from './CalendarDate';
import CalendarControls from './CalendarControls ';
// useEffect내에서 사용할 비동기 처리 함수, setState콜백 함수로 받아 처리
import handleAsyncOperation from '../../util/handleAsyncOperation';
import useFetchGetUsersPlan from '../../hooks/useFetchUserPlan';
import useFetchGetUsersGroups from '../../hooks/useFetchCalendarGroups';
import { planRecord } from '../../atom/planRecord';

const Calendar = () => {
    const {routeTo} = useRouter();
    const {idUser} = useRecoilValue(kakaoUser);
    const [userGroups, setUserGroups] = useState([]);
    const [userPlans, setUserPlans] = useRecoilState(planRecord);
    const {year, month} = useRecoilValue(calendarDateState);
    const setGroupName = useSetRecoilState(groupNameState);
    const setGroupMembers = useSetRecoilState(groupMemberState);
    const {currentYear, currentMonth, currentDate} = useRecoilValue(currentDateState);

    const customDate = `${year}-${month < 9 ? '0'+ (month + 1): month + 1}`; //yyyy-mm;
    const [totalDate , setTotalDate] = useState<number[][]>([]);

// 받은 유저의 그룹정보와 함께 바로 set을 통해 상태 업데이트
    const getGroupMemberFetch = useFetchGetUsersGroups();

    // 유저 계획기록가져오기
    const getUsersPlanRecordFetch = useFetchGetUsersPlan();

    useEffect(() => {
        if(idUser) {
            // 유저 더치페이그룹정보
            // handleAsyncOperation(getGroupMemberFetch(customDate), setUserGroups);
    
            // 유저 계획 정보
            // handleAsyncOperation(getUsersPlanRecordFetch(customDate), setUserPlans);
        }
        setTotalDate(changeDate(year, month));
    }, [getUsersPlanRecordFetch, getGroupMemberFetch, setGroupMembers,setUserPlans,customDate, idUser, year, month]);
    

    const onClickShowGroup = (groupName : string , groupMembers : string[]) => () => {
        setGroupName(groupName);
        setGroupMembers(groupMembers);
        routeTo(ROUTES.EXPENSE_MAIN);
    }

    const onClickDeleteGroup = (idUser: string, groupName: string) => async ()  => {
        try {
            const result =  await deleteData(`members?idUser=${idUser}&groupName=${groupName}`)
            // console.log(result);
            const findGroupIDX = userGroups.findIndex((item : any) => item.group.groupName === groupName );
            if (findGroupIDX !== -1) {
                const updatedGroups = [...userGroups];
                updatedGroups.splice(findGroupIDX, 1);
                // setUserGroups로 새로운 배열로 업데이트
                setUserGroups(updatedGroups);
            }
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <OverlayWrapper  padding='6vw 1vw 0 1vw'>
            {/* 년,월 이동 버튼 */}
            <CalendarControls/>

            {/* 요일 나타내기 */}
            <CalendarDate/>

            {/* 날짜 나타내기 */}
            {/* 더치페이의 그룹과, 유저가 만든 계획 보여주기 */}
            {totalDate?.map((_, rowIndex) => (
                <StyledCalendarRow  key={rowIndex}>
                    {totalDate[rowIndex]?.map((day, colIndex) => {
                        if (day === 0) {
                        return <StyledCalendarDateCol xs={1} key={colIndex}></StyledCalendarDateCol>;
                    } else {
                    // 해당 날짜와 일치하는 userGroups의 요소들을 필터링하고 처리
                        const matchingGroups = userGroups?.filter(({ date }) => date === String(day));
                        const matchingPlans = userPlans?.filter(({date}) => date === String(day));
                        return (
                                <StyledCalendarDateCol xs={1} key={colIndex}  color={currentYear === year && currentMonth === month && currentDate === Number(day)  ? '#ae7df9' : undefined}
                                >
                                    <span >{day}</span>
                                    {matchingGroups.length !== 0 &&
                                    <Dropdown>
                                        <Dropdown.Toggle  style={{width:'55px', padding:'0 7px'}} variant="success" id="dropdown-basic" size='sm'>
                                            그룹
                                        </Dropdown.Toggle><br></br>
                                        <Dropdown.Menu>
                                        {matchingGroups.map(({ usersData } : any, index : number) =>   
                                            <Dropdown.Item key={index}> 
                                                {usersData.groupName.length >5 ? usersData.groupName.slice(0,5)+'...' : usersData.groupName }
                                                <Button style={{marginLeft:'5px'}} variant="outline-primary" size='sm' onClick={onClickShowGroup(usersData.groupName, usersData.groupMembers)}>보기</Button>
                                                <Button style={{marginLeft:'5px'}} variant="outline-danger" size='sm' onClick={onClickDeleteGroup(idUser, usersData.groupName)} >삭제</Button>
                                            </Dropdown.Item>
                                            )
                                        }
                                        </Dropdown.Menu>
                                    </Dropdown> 
                                    }
                                    {matchingPlans.length !== 0 &&
                                    <Dropdown>
                                        <Dropdown.Toggle  style={{width:'55px', padding:'0 7px'}} variant="success" id="dropdown-basic" size='sm'>
                                            계획
                                        </Dropdown.Toggle><br></br>
                                        <Dropdown.Menu>
                                        {matchingPlans.map(({ plan } : any, index : number) =>   
                                            <Dropdown.Item key={index}> 
                                                {/* {group.groupName.length >5 ? group.groupName.slice(0,5)+'...' : group.groupName } */}
                                                {/* <Button style={{marginLeft:'5px'}} variant="outline-primary" size='sm' onClick={onClickShowGroup(group.groupName, group.groupMembers)}>보기</Button>
                                                <Button style={{marginLeft:'5px'}} variant="outline-danger" size='sm' onClick={onClickDeleteGroup(idUser, group.groupName)} >삭제</Button> */}
                                            </Dropdown.Item>
                                            )
                                        }
                                        </Dropdown.Menu>
                                    </Dropdown> 
                                    }
                                </StyledCalendarDateCol>
                            );
                        }
                    })}
                    </StyledCalendarRow>
                ))
            }
        </OverlayWrapper>
    )
}

export default Calendar

export type StyledCalendarProps = {
    color? : string;
    height? : string;
    border? : string;
    margin? : string;
    minHeight?: string;
    justifyContent? : string;
}

export const StyledCalendarRow = styled(Row)<StyledCalendarProps>`
    min-width: 360px;
    font-size: 20px;
    font-weight: 700;
    margin:${({margin}) => margin ? margin : '0'};
    display: flex;
    
    justify-content: ${({justifyContent}) => justifyContent ? justifyContent : 'space-between'};
    text-align: center;
    min-height: ${({minHeight}) => minHeight ? minHeight : "17vh" };
    white-space: nowrap;
    @media (min-width: 768px) {
        justify-content: center !important;
    }
`

export const StyledCalendarCol = styled(Col)<StyledCalendarProps>`
    min-width: ${({minWidth}) => minWidth ? minWidth : '360px'};
    min-height: ${({height}) => height && height};
    margin : ${({margin}) => margin ? margin : '0'};
    text-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${({border}) => border && border};
    color : ${({color}) => (color ? color : 'black')};
`

export const StyledCalendarDateCol = styled(Col)<StyledCalendarProps>`
    color: ${(proprs) => proprs.color &&  proprs.color};
    padding : 0;
    margin : 10px;
`
