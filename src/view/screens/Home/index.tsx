import Scheduler from 'devextreme-react/scheduler';
import * as R from 'ramda';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserRedux } from 'src/state/reducers';
import { UserActions } from 'src/state/_actions';

const views: any[] = ['agenda', 'month', 'day', 'week'];
const lessons = [
    '1,2,3',
    '1,2,3,4,5,6',
    '4,5,6',
    '7,8,9',
    '7,8,9,10,11,12',
    '10,11,12',
    '13,14,15,16',
];
const startTimeHours = [7, 7, 9, 12, 12, 15, 18];
const startTimeMinutes = [0, 0, 30, 35, 30, 5, 0];
const endTimeHours = [9, 12, 12, 14, 17, 17, 21, 17];
const endTimeMinutes = [25, 0, 0, 55, 30, 30, 15];
const shift = ['1', '1-2', '2', '3', '3-4', '4', '5'];

const Home: FC = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const schedules = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getSchedules),
    );
    const information = useSelector(
        R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    );

    useEffect(() => {
        if (schedules && information) {
            const newData: any = [];
            const listDays = Object.keys(schedules);
            listDays.map((day: any) => {
                const dayMiniSecond = day * 1;
                const YEAR = new Date(dayMiniSecond).getFullYear();
                const MONTH = new Date(dayMiniSecond).getMonth();
                const DAY = new Date(dayMiniSecond).getDate();
                schedules[day].map((item: any) => {
                    const subject: any = {};
                    const _class = `${item.address.split('_')[0]}-${
                        item.address.split(' ')[1]
                    }`;
                    lessons.map((lesson, index) => {
                        if (lesson === item.lesson) {
                            subject.shift = index + 1;
                            subject.text = `Ca ${shift[index]} : ${
                                item.subject.split('-')[0]
                            } : ${_class}`;
                            subject.startDate = new Date(
                                YEAR,
                                MONTH,
                                DAY,
                                startTimeHours[index],
                                startTimeMinutes[index],
                            );
                            subject.endDate = new Date(
                                YEAR,
                                MONTH,
                                DAY,
                                endTimeHours[index],
                                endTimeMinutes[index],
                            );
                        }
                    });
                    newData.push(subject);
                });
                return newData.sort((a: any, b: any) => a.shift - b.shift);
            });
            setData(newData);
        }
    }, [history, information, schedules]);

    const onLogOut = (): void => {
        dispatch(UserActions.setUser(undefined));
        dispatch(UserActions.setSchedules(undefined));
    };

    return (
        <div className="">
            <div className="w-full bg-kleinBlue h-16 flex items-center text-gray-100 justify-between sm:px-8 px-4">
                <p className="sm:text-2xl text-xl">KMA Schedule</p>
                <div className="flex items-center gap-4">
                    <p className="text-lg sm:block hidden">
                        Hi {information?.username} !
                    </p>
                    <button
                        type="button"
                        onClick={onLogOut}
                        className="outline-none focus:outline-none bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg"
                    >
                        LogOut
                    </button>
                </div>
            </div>
            <Scheduler
                dataSource={data}
                views={views}
                adaptivityEnabled={true}
                defaultCurrentView={'month'}
                height={700}
                startDayHour={6}
                endDayHour={22}
            />
        </div>
    );
};

export default Home;
