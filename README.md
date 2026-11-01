# SPORTEdu

A football academy website prototype that brings training content, athlete registration, and a rules quiz into one interface. The project combines React pages with separate HTML, CSS, and JavaScript pages, using a dark visual style, scrolling effects, and embedded training videos.

This repository contains the frontend source. The React build configuration is not included, so a fresh clone does not yet support a complete `npm install` / `npm start` workflow.

## Explore the project

| Area | What is implemented | Source |
| --- | --- | --- |
| Home | Training-program cards, football tips ticker, imagery, and academy navigation | [`src/components/Home.js`](src/components/Home.js) |
| Academy | Football rules, learning modules, and three embedded YouTube training videos | [`external/academy.html`](external/academy.html) |
| Registration | Athlete details, age/email/phone validation, and browser-local registration storage | [`external/register.html`](external/register.html) |
| Feedback | Star ratings, comments, and deletion backed by browser local storage | [`external/js/script.js`](external/js/script.js) |
| Interact | Ten-question quiz with scoring and answer highlighting, a contact-form demo, and a keyword-based training chat | [`src/components/Interact.js`](src/components/Interact.js) |
| Login demo | Email/password format checks, a session cookie, and a remember-me option | [`external/index.html`](external/index.html) |

The chat uses fixed responses for keywords such as `training` and `offside`. The contact form validates input and displays a success alert; it does not send a message to a server.

## Preview the static pages

With Python installed, run these commands from a terminal:

```sh
git clone https://github.com/NithisNandhan/SPORTEdu.git
cd SPORTEdu
python -m http.server 8000 --bind 127.0.0.1
```

Open [the login demo](http://127.0.0.1:8000/external/index.html). Use dummy details that meet the displayed format rules. A valid submission sets a demonstration cookie and redirects to `/`; this simple file server shows a directory listing there because it does not build the React application.

After that, open [Academy](http://127.0.0.1:8000/external/academy.html) or [Register](http://127.0.0.1:8000/external/register.html) directly. The shared script redirects these pages to the login demo when the demonstration session cookie is absent. Internet access is needed for the remote images and YouTube videos.

This previews the static portion only. The `/` and `/interact` React routes require a React development/build setup.

## React setup still needed

[`src/App.js`](src/App.js) defines `/` and `/interact` with React Router's `Routes` and `Route` APIs. [`src/index.js`](src/index.js) mounts the app with `react-dom/client` and expects an HTML element with `id="root"`.

To restore a runnable React application, the repository needs:

- A `package.json`, dependency versions, and development/build scripts for React, React DOM, and a compatible React Router version.
- An HTML entry point containing the root element and bundler configuration appropriate to the selected tool.
- Static serving for `external/` at `/external/`, alongside routing fallback for the React pages.
- Consistent login links: the React logout handlers currently redirect to `/external/login.html`, while the supplied login page is `/external/index.html`.

[`src/assignment.js`](src/assignment.js) is a separate routing exercise using the older `Switch` API. It is not imported by the main application.

## Current boundaries

Registration and feedback stay in the current browser's local storage. Login checks input formats and writes a cookie; there is no account database or server-side authentication. Use sample data when exploring the forms. No backend, shared user storage, email delivery service, or AI model integration is included.

## Tools

React · React Router · JavaScript · HTML · CSS · browser cookies · localStorage · YouTube embeds
