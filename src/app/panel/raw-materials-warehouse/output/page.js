'use client'
import {useSelector} from "react-redux";


export default function Dashboard() {
    const token = useSelector(state =>(state.auth))
    console.log(token)

    return (
        <>
            <div>
               <header className="bg-white h-20">
                   انبار مواد اولیه / خروجی
               </header>
                <section className="mt-5 bg-white h-[100rem]">
                </section>
            </div>
        </>
    )
}
