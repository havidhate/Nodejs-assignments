🔘 1. POST – Create Student
URL: POST http://localhost:5000/api/students

Body (JSON):

json
Copy
Edit
{
"name": "Aarav",
"age": 17,
"grade": "12th",
"section": "A",
"score": 88
}
🟢 Expected Result: 201 Created with student data

🔎 2. GET – Get All Students
URL: GET http://localhost:5000/api/students

Query Params Examples:

?grade=12th

?section=A

?search=aar

?sort=score

?page=1&limit=5

🟢 Expected Result: Array of students

🧠 3. GET – Analytics
URL: GET http://localhost:5000/api/students/analytics

🟢 Expected Result:

json
Copy
Edit
{
"averageScore": 85.3,
"topPerformers": [
{ "name": "Aarav", "score": 94 },
...
],
"studentsByGrade": {
"9th": 2,
"10th": 4,
...
}
}
👤 4. GET by ID – Single Student
URL: GET http://localhost:5000/api/students/:id

Replace :id with a real MongoDB \_id from previous result.

✏️ 5. PATCH – Update Student
URL: PATCH http://localhost:5000/api/students/:id

Body:

json
Copy
Edit
{
"score": 91
}
❌ 6. DELETE – Delete Student
URL: DELETE http://localhost:5000/api/students/:id

🟢 Expected Result: { "message": "Student deleted" }
