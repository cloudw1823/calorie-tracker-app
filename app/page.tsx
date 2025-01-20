"use client";
import { useState, useEffect } from "react";
// import TrendChart from "@/components/TrendChart";
import FoodInfoCard from "@/components/FoodInfoCard";
import Calendar from "@/components/Calendar";
// import { SelectScrollable } from "@/components/SelectChart";
import ExpandableToolbar from "@/components/ToolBar";
import { supabase } from "@/lib/supabaseClient";
import SpinnerLoader from '@/components/Loader'
import { MdOutlineMenu } from 'react-icons/md'
import { User, Entry, FoodInfo } from '@/lib/types'

export default function Page() {
    const [entries, setEntries] = useState<Entry[]>([])
    const [user, setUser] = useState<User | null>(null)
    // const [chartType, setChartType] = useState<'day' | 'week' | 'month'>('day')

    useEffect(() => {
        const fetchCalories = async () => {
            if (!user) return

            const { data, error } = await supabase
                .from('calorie_entries')
                .select('*')
                .eq('user_id', user.user_id)

            if (error) {
                console.error('Error fetching calories:', error.message)
                return
            }

            setEntries(
                (data as Entry[]).map((entry) => ({
                    user_id: user.user_id,
                    calories: entry.calories,
                    time: new Date(entry.date),
                    date: entry.date,
                }))
            )
        }

        fetchCalories()
    }, [user])

    const handleLogin = async (loginInfo: {
        username: string
        password: string
    }) => {
        const { data, error } = await supabase
            .from('users_m')
            .select('*')
            .eq('username', loginInfo.username)
            .eq('password', loginInfo.password)
            .single()

        if (error || !data) {
            console.error('Login failed: Invalid username or password')
            alert('Invalid username or password')
            return
        }

        console.log('Login successful:', data)
        setUser({ user_id: data.user_id, username: data.username })
    }

    const handleSignUp = async (signUpInfo: {
        username: string
        password: string
    }) => {
        const { data, error } = await supabase.from('users_m').insert([
            {
                username: signUpInfo.username,
                password: signUpInfo.password,
            },
        ])

        if (error) {
            console.error('SignUp error:', error.message)
            return
        }

        console.log('SignUp successful:', data)
        alert('Account created successfully! Please log in.')
    }

    const handleLogout = () => {
        setUser(null)
        setEntries([])
    }

    const handleCaloriesEntry = async (entry: {
        calories: number
        time: Date
    }) => {
        if (!user) {
            alert('Please log in to add calorie entries.')
            return
        }

        const { error } = await supabase.from('calorie_entries').insert([
            {
                user_id: user.user_id,
                date: entry.time.toISOString().split('T')[0],
                calories: entry.calories,
            },
        ])

        if (error) {
            console.error('Error adding calorie entry:', error.message)
            return
        }

        setEntries([
            ...entries,
            {
                user_id: user.user_id,
                calories: entry.calories,
                time: entry.time,
                date: entry.time.toLocaleDateString(),
            },
        ])
    }

    const handleProfileMenuOpen = () => {}
    const foodList: FoodInfo[] = [
        {
            foodName: '卵',
            calories: 142,
            count: 2,
        },
        {
            foodName: '野菜',
            calories: 112,
            count: 3,
        },
        {
            foodName: '豚肉',
            calories: 122,
            count: 5,
        },
    ]
    return (
        <div className=" container max-h-fit md:max-h-screen font-robotoMono">
            <div className="relative overflow-hidden">
                <div className="absolute -z-10 w-[200vh] h-[200vh] -translate-y-[75%] -translate-x-[40%] top-0 left-0 bg-sub-key-color2 rounded-b-full"></div>
                <header className="flex py-4 px-4 font-sans justify-between items-center">
                    <h1 className="ml-2 tex-4xl md:text-5xl font-bold">
                        Calorie Tracker
                    </h1>
                    <div className="mr-2" onClick={handleProfileMenuOpen}>
                        <MdOutlineMenu size={55} />
                    </div>
                </header>

                <main className="mx-auto p-6 grid gap-6">
                    <Calendar />
                    <div className="flex w-full justify-center items-center">
                        <div className="inline-flex flex-col gap-1 items-center">
                            <span className="text-main-key-color1 font-bold font-sans text-xl">
                                Now
                            </span>
                            <span className="text-3xl">111</span>
                            <span className="text-gray-500 font-sans">
                                kcol
                            </span>
                        </div>
                        <div>
                            <SpinnerLoader />
                        </div>
                        <div className="inline-flex flex-col gap-1 items-center">
                            <span className="text-main-key-color1 font-bold font-sans text-xl">
                                Max
                            </span>
                            <span className="text-3xl">123</span>
                            <span className="text-gray-500 font-sans">
                                kcal
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-sans font-semibold">
                            Daily
                        </div>
                        <br />
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-4">
                            <FoodInfoCard
                                title="朝食"
                                foodList={foodList}
                                unit="kcal"
                            />
                            <FoodInfoCard
                                title="昼食"
                                foodList={foodList}
                                unit="kcal"
                            />
                            <FoodInfoCard
                                title="晩食"
                                foodList={foodList}
                                unit="kcal"
                            />
                            <FoodInfoCard
                                title="間食"
                                foodList={foodList}
                                unit="kcal"
                            />
                        </div>
                    </div>
                </main>
            </div>

            <ExpandableToolbar
                user={user}
                onLogin={handleLogin}
                onSignUp={handleSignUp}
                onLogout={handleLogout}
                onCaloriesEntry={handleCaloriesEntry}
            />
        </div>
    )
}
