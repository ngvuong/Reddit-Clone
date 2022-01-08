# Reddit-Clone

https://ngvuong.github.io/Reddit-Clone/

A simple clone of Reddit that allows users to browse various types of content and submit their own posts. Users are able to share their favorite photos, youtube videos, links or simple text content. Upvote a post to bring it to the top or share your thoughts by commenting or replying to others. This Reddit clone emulates the real site's easy-to-browse posts feed with the dark theme.

## Technologies and key concepts

Reddit Clone was created using ReactJs to enable ease of code reuse with components. Following closely with Reddit's actual format, many components were able to be used in multiple places in the app. One such example is the homepage feed comprising of many post cards that are also used in the individual page for each post with slight adjustments. This process greatly limited the need to copy and paste code for similar content. Styling for the app was done through styled components which helped with the overall flow and speed of development. Although the site looks simple, many challenges and bugs were encountered. Sorting and searching of posts and comments were difficult to tackle initially. Storage of the posts and comments was done through Firebase firestore in realtime as any updates were made. User authentication was done through Firebase with log in/sign up with Google or with email and password. Overall, the development process was challenging yet fulfilling.

- React
- Styled Components
- Firebase authentication/firestore
