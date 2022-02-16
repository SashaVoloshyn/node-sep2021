// const path = require('path');
// const fs = require('fs');
//
//
// // fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true}, (err) => {
// //     if (err) {
// //         console.log(err);
// //         throw err;
// //     }
// // });
// //
// // fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err) => {
// //     if (err) {
// //         console.log(err);
// //         throw err;
// //     }
// // });
//
// const inPersonUsers = [
//     {name: "Vitalik", age: 25, city: "Lviv"},
//     {name: "Anya", age: 17, city: "Ternopil"},
//     {name: "Sasha", age: 23, city: "Lviv"}
// ];
// const onlineUsers = [
//     {name: "Alina", age: 20, city: "Kyiv"},
//     {name: "Nastya", age: 16, city: "Kharkiv"},
//     {name: "Alex", age: 18, city: "Odessa"}
// ];
//
//
// // for (let i = 0; i < inPersonUsers.length; i++) {
// //     for (const inPersonUsersKey in inPersonUsers[i]) {
// //
// //         fs.writeFile(
// //             path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'),
// //             `${inPersonUsersKey}:${inPersonUsers[i][inPersonUsersKey]}\n`,
// //             {flag:'a'},
// //             (err) => {
// //                 if (err) {
// //                     console.log(err);
// //                     throw err;
// //                 }
// //             }
// //         );
// //     }
// // }
// //
// // for (let i = 0; i < onlineUsers.length; i++) {
// //     for (const onlineUsersKey in onlineUsers[i]) {
// //         fs.writeFile(
// //             path.join(__dirname,'main','online','online.txt'),
// //             `${onlineUsersKey}:${onlineUsers[i][onlineUsersKey]}\n`,
// //             {flag:'a'},
// //             (err)=>{
// //                 console.log(err);
// //                 throw err;
// //             }
// //         )
// //     }
// // }
//
//
// const myFirstFunction=()=>{
//     fs.readFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'),'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'), `${data}`,{flag:'w'},(err)=>{
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//
//         })
//
//     });
//
//     fs.readFile(path.join(__dirname, 'main', 'online', 'online.txt'),'utf8', (err, data2) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), `${data2}`,{flag:'w'},(err)=>{
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//
//         })
//     });
//
// }
//
// myFirstFunction();
//
//
