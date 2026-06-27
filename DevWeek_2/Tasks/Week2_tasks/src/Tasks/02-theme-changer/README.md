# 02 Theme Changer

## Roadmap Mapping

- Week 2
- State (`useState`)
- Events

## What This Task Revises

- local state
- click event handling
- dynamic UI update from state

## Why This Approach

- one `themeClass` state controls the visible background
- clicking a button updates the state
- same color click resets to default so there is a small rule to remember

## What To Keep In Mind

- state stores the current theme
- button click triggers the setter
- re-render makes the UI reflect the new class

## Done When

- clicking a color changes the UI
- clicking same color resets to white
- buttons are rendered from an array instead of repeated manually

## Revision Questions

1. Why is `useState` needed here?
2. How does button click change the UI?
3. Why is mapping over color options cleaner than hardcoding every button?
