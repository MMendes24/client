![Campaign Journal](/assets/cj.png)

## Campaign Journal

Campaign Journal is a single-page React app that allows you to create and manage fantasy worlds and other fictional settings, focusing especially on tabletop games (no support for other mediums is yet present.) Currently, it allows you to create and describe "campaigns", as well as the characters, countries, and worlds attached to them. The development focus so far has been keeping it sleek, simple, and functional. Its server, along with a detailed explanation of the endpoints available, can be found here: https://github.com/campaignjournal/server


### Tech Stack

React | Material-UI | Formik | Yup 

Primarily, keeping the app in vanilla React and avoiding "over-engineering" was a huge focus. Therefore, the decision was made to keep outside libraries to a minimum. Despite this, due to the unusually large amount of forms required for the app's functionality Formik was brought in to standardize and streamline the process of form building and submission (although it's worth noting that Formik is, essentially, built entirely using vanilla React.) Because Formik has built-in compatibility with Yup, which is already a brilliantly simple and elegant solution to the issue of form validation, Yup was also brought in. Material-UI was chosen because it keeps styles modern and uniform, minimizing issues with the UI and helping to prevent human error caused by "eyeballing" things like measurements. 

### Functionality

Users must be registered and logged in to access any of the functionality of campaign journal. A user can create any number of campaigns, and any number of items attached to that campaign. Users can perform all CRUD operations on any item.

### Future Releases

Currently, the routers for History and Religion end points (which can be found in the web server) are unused by the client, and expanding user options to include this is a high priority. The ability for users to collaborate and share their works, as well as the introduction of a related "admin" role are likely to come in a future release.

The decision to attach worlds to campaigns (rather than campaigns to worlds) was made due to the fact that many "fantasy games" often include multiple worlds but are part of a single, consistent narrative. However, there are flaws to this approach (reusing a world for a later narrative, for example) and the choice to split them up entirely or else reverse their order might one day be made. 

A more distant goal is the support of other storytelling mediums (novels, movies, etc.)


