/* eslint-disable react/prop-types */
import classes from "./Layout.module.scss"
import React from 'react'

export default function Layout({ children }) {
  return (
    <main className={classes.container}>
        { children }
    </main>
  )
}
