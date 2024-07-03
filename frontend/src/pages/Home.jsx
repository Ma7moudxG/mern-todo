import React from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/nav/Navbar'
import TaskList from '../components/tasks/TaskList'
import classes from "./Home.module.scss"

export default function Home() {
  return (
    <Layout className={classes.main}>
        <Navbar />
        <TaskList />
    </Layout>
  )
}
