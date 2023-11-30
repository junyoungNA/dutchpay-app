import {  useCallback, useEffect, useState } from 'react';
import changeDate from '../../util/changeDate';
import OverlayWrapper from '../shared/OverlayWrapper';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { calendarDateState } from '../../atom/calendarDate';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import { kakaoUser } from '../../atom/kakaoUser';
import {  getCalendarGroups } from '../../util/api/api';
import { groupNameState } from '../../atom/groupName';
import { ROUTES } from '../../route/routes';
import { groupMemberState } from '../../atom/groupMembers';
import { deleteData } from '../../util/api/apiInstance';
import { currentDateState } from '../../atom/currentDate.state';
import { useRouter } from '../../hooks/useRouter';

const Calendar = () => {
    const {routeTo} = useRouter();
    const {idUser} = useRecoilValue(kakaoUser);
    const [userGroups, setUserGroups] = useState([]);
    const [{year, month}, setCalendar] = useRecoilState(calendarDateState);
    const setGroupName = useSetRecoilState(groupNameState);
    const setGroupMembers = useSetRecoilState(groupMemberState);
    const {currentYear, currentMonth, currentDate} = useRecoilValue(currentDateState);

    const customDate = `${year}-${month < 10 ? '0'+ (month + 1): month + 1}`; //yyyy-mm;
    const DATE_ARR = ['일','월','화','수','목','금','토',];
    const [totalDate , setTotalDate] = useState<number[][]>([]);

    // useResetRecoilState로 초기화 함수 가져오기
    const resetCalendarState = useResetRecoilState(calendarDateState);

    const getGroupMemberFetch = useCallback(async(idUser : string) => {
        const resultGroups: any = await getCalendarGroups(idUser, customDate);
        setUserGroups(resultGroups);
    },[customDate]);


    useEffect(() => {
        if(idUser) {
            getGroupMemberFetch(idUser);
        }
        setTotalDate(changeDate(year, month));
        }, [year, month, getGroupMemberFetch, idUser]);

    const onClickArrowSetCalendar = (direction : number, ) => {
        // 이전이면 direction = -1 , 다음 + 1
        let newMonth  = month + direction;
        let newYear = year;
        if(newMonth > 11) {
            newMonth = 0;
            newYear += 1; 
        } 
        if(newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        }
        const newDate = {
            year : newYear,
            month : newMonth,
        }
        // console.log(newMonth, '새로운달');
        // console.log(newYear, '새로운년');
        setCalendar(newDate);
    }

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
            <StyledCalendarRow xs={1}  minHeight={"0vh"}>
                <StyledCalendarCol  xs={12} md={1}>{year}년 {month + 1} 월</StyledCalendarCol>
                {/* 이전, 다음 오늘 보여주는 버튼 */}
                <StyledCalendarCol  xs={12} md={1}>    
                    <StyledArrow margin='0 15px 0 0' onClick={() => onClickArrowSetCalendar(-1)}>
                        <ArrowLeft size={30} />
                    </StyledArrow>
                    <Button variant="outline-secondary" onClick={() => resetCalendarState()}>Today</Button>                  
                    <StyledArrow margin='0 0 0 15px' onClick={() => onClickArrowSetCalendar(1)}>
                        <ArrowRight size={30}/>
                    </StyledArrow>                
                </StyledCalendarCol>
            </StyledCalendarRow>
            <StyledCalendarRow  minHeight={"0vh"}>
                {DATE_ARR.map((day, index) => 
                    { 
                        switch(day) {
                            case '일' : 
                            return (
                                <StyledCalendarDateCol xs={1}   key={day} color='#b61233'>{day}</StyledCalendarDateCol>
                            );
                            case '토' :
                            return (
                                <StyledCalendarDateCol xs={1} key={day} color='#0a6ba3' >{day}</StyledCalendarDateCol>
                                );
                            default :
                            return (<StyledCalendarDateCol xs={1} key={day}>{day}</StyledCalendarDateCol>);
                        }
                    }
                )}
            </StyledCalendarRow>
            {totalDate?.map((_, rowIndex) => (
                <StyledCalendarRow  key={rowIndex}>
                    {totalDate[rowIndex]?.map((day, colIndex) => {
                        if (day === 0) {
                        return <StyledCalendarDateCol xs={1} key={colIndex}></StyledCalendarDateCol>;
                    } else {
                    // 해당 날짜와 일치하는 userGroups의 요소들을 필터링하고 처리
                        const matchingGroups = userGroups.filter(({ date }) => date === String(day));
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
                                        {matchingGroups.map(({ group } : any, index : number) =>   
                                            <Dropdown.Item key={index}> 
                                                {group.groupName.length >5 ? group.groupName.slice(0,5)+'...' : group.groupName }
                                                <Button style={{marginLeft:'5px'}} variant="outline-primary" size='sm' onClick={onClickShowGroup(group.groupName, group.groupMembers)}>보기</Button>
                                                <Button style={{marginLeft:'5px'}} variant="outline-danger" size='sm' onClick={onClickDeleteGroup(idUser, group.groupName)} >삭제</Button>
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

type StyledCalendarColProps = {
    color? : string;
    height? : string;
    border? : string;
    margin? : string;
}

type StyledCalendarArrowProps = {    
    margin? : string;
}

interface StyledCalendarRowProps  {
    minHeight?: string;
    margin?: string;
    justifyContent? : string;
}

const StyledCalendarRow = styled(Row)<StyledCalendarRowProps>`
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

const StyledCalendarCol = styled(Col)<StyledCalendarColProps>`
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

const StyledCalendarDateCol = styled(Col)<{color ?: string}>`
    color: ${(proprs) => proprs.color &&  proprs.color};
    padding : 0;
    margin : 10px;
`

const StyledArrow = styled.div<StyledCalendarArrowProps>`
  // 공통 스타일을 여기에 적용
    margin: ${({ margin }) => margin && margin};
    cursor: pointer;
`;
