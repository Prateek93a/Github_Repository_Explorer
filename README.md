# Github Repository Explorer

## Overview
The main project is the API found at `/api` endpoint. I have also setup a basic website for testing purposes. Since the website was not the highlight, I did not do much on the UI part. However the API part works as stated in the problem statement.


## Implementation details
Here I have provided high level details of the implementation.
Github doesn't provide any API to get the repositories of an organisation sorted according to number of forks. So I had to fetch all the repositories and then sort them. 
In case of contributors, Github's API provides the list sorted on the basis of commits by default. 

For making the requests I am using  `@octokit/rest` library. Github API serves requests using pagination to ease the server load. For fetching the repositories, I first made a dummy request to get the response which has details about total pages. Github doesn't provide an API for total pages for resources.
After fetching the number of pages, I am fetching all the repositories and sorting them based on fork counts. After that, requests are made for contributors per repository. Finally the response is sent.

For optimising the request calls, I am making asynchronous fetch requests and then resolving them all together using `Promise.all` method. This has proved to improve the performance of the API compared to synchronous calls.
While fetching repositories, I have kept the per-page results as 100 instead of default value of 30 to reduce the number of requests. This avoids hitting the API requests limit of Github API early.


## Assumptions
Following assumptions were made while building the API.
 - Repository Count(n) and Contributor Count(m) have positive integers as valid values. Negative numbers, 0 and non integers are assumed invalid and result in 400 Error status.
 - Organisation name is assumed to exactly match the name as it is on Github including case and special characters.
 - If the organisation doesn't have the required number of repositories or if one or more repositories don't have required number of contributors, then whatever number of resources that are available,they are sent.
 
 
## Tools and resources used
I have the following environment:
 - `node 10.19.0`
 - `yarn 1.22.4`

Also, I also used [Github Rest API Docs](https://docs.github.com/en/free-pro-team@latest/rest) and [Octokit/Rest API Docs](https://octokit.github.io/rest.js/v18) for reference.
 

## API reference
The API is found at `/api` endpoint.
|Parameters|Description|Accepted value type  |
|--|--|--|
| org_name |Name of the organisation| String |
| repo_count |Number of repositories based on forks count| Interger (positive) |
| contributor_count |Number of contributors per repository based on commits count| Interger (positive) |

Example URL: `/api?org_name=dummy&repo_count=1&contributor_count=1`


## Running locally
Clone the repository in the desired directory. Generate a [Github personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) and then place it inside `.env` file. Use `sample.env` for reference.
Execute the following instructions.
 - `yarn`
 - `yarn start`


## License
MIT
 
 
