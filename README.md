# NutriTrack
#### The Sustainable Nutrition Tracking App

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Points System](#points-system)
4. [Environment Setup](#environment-setup)
5. [Security](#security)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
    - [Authentication API](#authentication-api)
    - [User API](#user-api)
    - [Food API](#food-api)
    - [Tracking API](#tracking-api)
    - [User Stats API](#user-stats-api)
8. [Contribution](#contribution)
9. [Licenses](#licenses)

---

## Project Overview
**NutriTrack** is an innovative app designed to help users track their food consumption, nutritional information, and environmental impact. By providing valuable insights into dietary decisions and statistics, NutriTrack not only promotes healthier habits but also rewards users for their progress.

## Technologies Used

NutriTrack leverages the following key technologies:

- **Java 17:** Programming language used for backend development.
- **Spring Boot:** Framework for building and running the application.
  - **Spring Data JPA:** For database interactions.
  - **Spring Security:** For authentication and authorization.
  - **Springdoc OpenAPI:** For API documentation with Swagger UI.
- **PostgreSQL:** Relational database system for data storage.
- **Docker:** Containerization for consistent deployment.
- **Docker Compose:** Managing multi-container Docker applications.
- **pgAdmin:** Database management tool for PostgreSQL.
- **JWT (JSON Web Tokens):** Secure authentication mechanism.
- **Maven:** Build automation and dependency management.

## Points System

The points system is designed to motivate users to make healthier dietary choices by awarding points for tracking foods. These points are awarded on each tracking entry the user made based on the nutritional information and CO2 emissions.

### Functionality

- Points Based on Diet Type:
  - Vegan meals: 15 points
  - Vegetarian meals: 8 points
  - Other meals: 2 points

- Points Based on CO2 Emissions:
  - CO2 emissions < 0.1 kg: 10 points
  - CO2 emissions < 0.2 kg: 5 points
  - CO2 emissions < 0.3 kg: 2 points

- Points Based on Caloric Content:
  - Calories < 100: 5 points
  - Calories < 200: 3 points
  - Calories < 300: 1 point

## Environment Setup

### Prerequisites

Before setting up the project, ensure you have the following software installed on your machine:

- [Java Development Kit (JDK) 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Cloning the Repository

Clone the project repository from GitHub:

```sh
git clone https://github.com/Clausioporosis/nutritrack.git
cd nutritrack
```

### Docker Setup

The project includes a docker-compose.yml file to set up the PostgreSQL database, pgAdmin, and run the application. Ensure you are in the project's root directory and use the following command to start the services:

#### Running the Application 

```sh
docker-compose up -d
```

The application will be accessible at http://localhost:8080.

#### Stopping the Services

```sh
docker-compose down
```

### Additional Notes

- **Database Management:** pgAdmin is included in the docker-compose.yml file for easier database management. Access it at http://localhost:5050 with the default credentials provided (email: admin@admin.com password: admin).
- **API Documentation:** The project uses SpringDoc and Swagger UI for API documentation. Once the application is running, you can access the API documentation at http://localhost:8080/swagger-ui.html.
- **Security:** The project uses JWT for authentication and Spring Security for securing endpoints. Ensure to configure your jwt.secret: in the application.yml.

## Security

**NutriTrack** implements various security measures to protect user data and ensure secure access to the API.

### Authentication

The application uses JSON Web Tokens (JWT) for authentication. Upon successful login, a token is issued to the user, which must be included in the header of subsequent requests.

### Extracting User ID from JWT Token 

For user-related operations, the user ID is securely extracted from the JWT token provided in the request header. This process ensures that each request is authenticated, and the user ID is reliably obtained from the token payload. The extracted user ID is then used to perform operations specific to the authenticated user across various APIs, including the Food API, Tracking API, and User Stats API. This mechanism guarantees that all data and actions are accurately associated with the correct user.

## Database Schema

Below is the database schema for NutriTrack, providing a visual overview of how the data is structured and related:

<picture>
  <source srcset="assets/NutriTrack-drawSQL-image-export-10.06.24-dark-mode.png" media="(prefers-color-scheme: dark)">
  <img src="assets/NutriTrack-drawSQL-image-export-10.06.24.png" alt="NutriTrack PostgreSQL Schema using DrawSQL">
</picture>

## API Documentation

### Authentication API

**Endpoint: `/api/auth/register`**
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string",
        "firstName": "string",
        "lastName": "string"
    }
    ```

**Endpoint: `/api/auth/authenticate`**
- **Method:** `POST`
- **Description:** Authenticate a user and return a JWT token.
- **Request Body:**
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response Body:**
    ```json
    {
        "token": "string"
    }
    ```

### User API

**Endpoint: `/api/users`**
- **Method:** `GET`
- **Description:** Get all users.
- **[Response Body:](#user-response-body)**

**Endpoint: `/api/users/{id}`**
- **Method:** `GET`
- **Description:** Get user by ID.
- **[Response Body:](#user-response-body)**

**Endpoint: `/api/users/search?keyword={keyword}`**
- **Method:** `GET`
- **Description:** Search users by keyword.
- **[Response Body:](#user-response-body)**

**Endpoint: `/api/users/me`**
- **Method:** `GET`
- **Description:** Get the current user.
- **[Response Body:](#user-response-body)**

#### **User Response Body**
```json
{
     "id": 0,
     "username": "string",
     "email": "string",
     "firstName": "string",
     "lastName": "string"
}
```

**Endpoint: `/api/users/{id}`**
- **Method:** `DELETE`
- **Description:** Delete user by ID.
    
### Food API

**Endpoint: `/api/foods`**
- **Method:** `POST`
- **Description:** Create a new food item.
- **Request Body:**
```json
    {
        "title": "string",
        "brand": "string",
        "category": "string",
        "nutrition": {
            "calories": 0.0,
            "protein": 0.0,
            "carbs": 0.0,
            "fat": 0.0
        },
        "sustainability": {
            "co2perKg": 0.0,
            "dietType": "OMNIVORE|VEGETARIAN|VEGAN"
        },
        "portions": [
            {
                "label": "String",
                "quantity": 0.0
            }
        ],
        "liquid": false
    }
```

**Endpoint: `/api/foods/user`**
- **Method:** `GET`
- **Description:** Get all food items.
- **[Response Body:](#food-response-body)**

**Endpoint: `/api/foods/{id}`**
- **Method:** `GET`
- **Description:** Get details of a food item by ID.
- **[Response Body:](#food-response-body)**

#### **Food Response Body**
```json
    {
        "id": 0,
        "title": "string",
        "brand": "string",
        "category": "string",
        "nutrition": {
            "calories": 0.0,
            "protein": 0.0,
            "carbs": 0.0,
            "fat": 0.0
        },
        "sustainability": {
            "co2perKg": 0.0,
            "dietType": "OMNIVORE|VEGETARIAN|VEGAN"
        },
        "portions": [
            {
                "id": 0,
                "label": "string",
                "quantity": 0.0
            }
        ],
        "liquid": false
    }
```

**Endpoint: `/api/foods/{id}`**
- **Method:** `PUT`
- **Description:** Update details of a specific food item by ID. Removes portions which are not present in the request body. Adds new portion if portion ID in json body is missing.  
- **Request Body:**
  
```json
    {
        "title": "string",
        "brand": "string",
        "category": "string",
        "nutrition": {
            "calories": 0.0,
            "protein": 0.0,
            "carbs": 0.0,
            "fat": 0.0
        },
        "sustainability": {
            "co2perKg": 0.0,
            "dietType": "OMNIVORE|VEGETARIAN|VEGAN"
        },
        "portions": [
            {
                "id": 0,
                "label": "String",
                "quantity": 0.0
            },
            {
                "label": "String",
                "quantity": 0.0
            }
        ],
        "liquid": false
    }
```

**Endpoint: `/api/foods/user/simple`**
- **Method:** `GET`
- **Description:** Get all simplified food items.
- **[Response Body:](#simple-food-response-body)**

**Endpoint: `/api/foods/user/simple/search?title={title}`**
- **Method:** `GET`
- **Description:** Search for simplified food items by title.
- **[Response Body:](#simple-food-response-body)**

#### **Simple Food Response Body**
```json
    {
        "id": 0,
        "title": "string",
        "brand": "string",
        "category": "string",
    }
```

**Endpoint: `/api/foods/{id}`**
- **Method:** `DELETE`
- **Description:** Deactivate a food item by ID.

**Endpoint: `/api/foods/{id}/hard-delete`**
- **Method:** `DELETE`
- **Description:** Delete a food item by ID.

### Tracking API

**Endpoint: `/api/tracking`**
- **Method:** `POST`
- **Description:** Track a food item and it's portion size. If `portionId = null`, the tracking quantity will be directly used as the weight, meaning if `portionId = null` and `quantity = 260`, the weight of the tracked item would be 260 g or ml, depending on the type.
- **Request Body:**
```json
    {
        "foodId": 0,
        "portionId": 0,
        "quantity": 0.0
    }
```
- **Response Body:**
```json
    {
        "id": 0,
        "food": {
            "id": 0,
            "title": "string",
            "brand": "string",
            "category": "string",
            "isLiquid": false
        },
        "portion": {
            "id": 1,
            "label": "string",
            "quantity": 0.0
        },
        "quantity": 0.0,
        "timestamp": [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ]
    }
```

**Endpoint: `/api/tracking/{id}`**
- **Method:** `PUT`
- **Description:** Update a tracking entry.
- **Request Body:**
```json
    {
        "portionId": 0,
        "quantity": 0.0
    }
```

**Endpoint: `/api/tracking/user`**
- **Method:** `GET`
- **Description:** Get all tracking entries.
- **Response Body:**
```json
    {
        "id": 0,
        "food": {
            "id": 0,
            "title": "string",
            "brand": "string",
            "category": "string",
            "isLiquid": false
        },
        "portion": {
            "id": 0,
            "label": "string",
            "quantity": 0.0
        },
        "quantity": 0.0,
        "timestamp": [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ]
    }
```

**Endpoint: `/api/tracking/user/date?date={YYYY-MM-DD}`**
- **Method:** `GET`
- **Description:** Get tracking entries and stat summary on a specific day.
- **Response Body:**
```json
    {
       "trackings": [
           {
              "id": 0,
              "food": {
                   "id": 0,
                   "title": "string",
                   "brand": "string",
                   "category": "string",
                   "isLiquid": false
               },
               "portion": {
                    "id": 0,
                    "label": "string",
                    "quantity": 0.0
                },
                "quantity": 0.0,
                "timestamp": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ]
            }
        ],
        "summary": {
            "totalCalories": 0.0,
            "totalProtein": 0.0,
            "totalCarbs": 0.0,
            "totalFat": 0.0,
            "totalCo2": 0.0,
            "totalVeganMeals": 0,
            "totalVegetarianMeals": 0,
            "dailyPoints": 0
        }
    }
```

**Endpoint: `/api/tracking/{id}`**
- **Method:** `DELETE`
- **Description:** Delete tracking entry by ID.

### User Stats API

**Endpoint: `/api/user/total`**
- **Method:** `GET`
- **Description:** Get total stat summary.
- **[Response Body:](#stats-response-body)**

**Endpoint: `/api/user/date?date={YYYY-MM-DD}`**
- **Method:** `GET`
- **Description:** Get stat summary of the current user on a specific day.
- **[Response Body:](#stats-response-body)**

#### **Stats Response Body**
```json
    {
        "totalCalories": 0.0,
        "totalProtein": 0.0,
        "totalCarbs": 0.0,
        "totalFat": 0.0,
        "totalCo2": 0.0,
        "totalVeganMeals": 0,
        "totalVegetarianMeals": 0,
        "totalPoints": 0
    }
```

## Contribution

### How to Contribute

1. Open an Issue
   
   - Start by opening an issue on the repository to describe the bug you've found or the feature you'd like to add. Be as detailed as possible.
   - Once the issue is created, use the GitHub interface to create a new branch directly from the issue page. This ensures that your branch is linked to the issue. Make sure to base your new branch on the `develop` branch.
     
3. Develop and Test
   
   - Clone your forked repository to your local machine.
     
   ```sh
   git clone https://github.com/your-username/nutritrack.git
   cd nutritrack
   ```
   
   - Checkout the branch created from the issue.
     
   ```sh
   git checkout -b issue-number-branch-name
   ```
   
   - Implement your changes and thoroughly test them.
     
4. Commit Changes
   
   - Commit your changes with a meaningful commit message, referencing the issue number.
     
   ```sh
   git commit -m "Fixes #issue-number: Description of the feature or fix"
   ```

6. Push to your Fork
   
   - Push your branch to your forked repository.
     
   ```sh
   git push origin issue-number-branch-name
   ```

8. Open a Pull Request
   
   - Open a pull request from your branch to the `develop` branch of the original repository. In the PR description, include a reference to the issue using keywords like "Fixes|Resolves|Closes #issue-number". This will automatically link the PR to the issue and close the issue when the PR is merged.
   - Provide a detailed description of your changes and any additional context or information that might be helpful for the review.
     
### Issues

- **Reporting Bugs:** If you find a bug, please open an issue with a detailed description of the problem and steps to reproduce it.
- **Feature Requests:** If you have a feature request, open an issue with a detailed description of the proposed feature and why it would be beneficial.

## Licenses

NutriTrack uses several open-source components. Below is a list of these components and their respective licenses:

### Spring Boot Starter Web
- **License**: Apache License 2.0
- **Link**: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

### Spring Boot Starter Test
- **License**: Apache License 2.0
- **Link**: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

### Spring Boot Devtools
- **License**: Apache License 2.0
- **Link**: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

### Spring Boot Maven Plugin
- **License**: Apache License 2.0
- **Link**: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

### PostgreSQL
- **Image**: `postgres:16.2`
- **License**: PostgreSQL License
- **Link**: [PostgreSQL License](https://www.postgresql.org/about/licence/)

### pgAdmin
- **Image**: `dpage/pgadmin4`
- **License**: PostgreSQL License
- **Link**: [pgAdmin License](https://www.pgadmin.org/licence/)

### Maven
- **Image**: `maven:3.8.3-openjdk-17-slim`
- **License**: Apache License 2.0 for Maven, GPL with Classpath Exception for OpenJDK
- **Link (Maven)**: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- **Link (OpenJDK)**: [GPL with Classpath Exception](https://openjdk.java.net/legal/gplv2+ce.html)

## Authors and Contributors

- **Author**: Claudio Schmidt [Clausioporosis](https://github.com/Clausioporosis)

### Contributors

A full list of contributors can be found on [GitHub Insights](https://github.com/Clausioporosis/NutriTrack/graphs/contributors).

## Proprietary License

This software is proprietary and all rights are reserved by the author.

### Terms

1. The Software may not be used for any commercial purpose without the explicit written permission of the copyright holder.
2. The Software may not be modified, merged, published, distributed, sublicensed, or sold without the explicit written permission of the copyright holder.
3. Redistributions of the Software in source or binary forms must retain the above copyright notice, this list of conditions, and the following disclaimer.

### Disclaimer

THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
