const path = require('path');
const fs = require('fs');


/*// 1. Спробуйте створити якийсь файл txt, прочитайте
// з нього дані і одразу, дані які ви отримали запишіть їх в інший файл

fs.readFile(path.join(__dirname, 'classwork1.txt'), 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    fs.writeFile(path.join(__dirname, 'classwork1_1.txt'), `${data}`, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
});*/



// // 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// // Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
// //     старий файл видаліть після того як все завершиться.
//
// fs.readFile(path.join(__dirname, 'classwork1_2.txt'), 'utf8', (err,data2) => {
//     if (err) {
//         throw err;
//     }
//     fs.mkdir(path.join(__dirname, 'task2'), (err) => {
//         if (err) {
//             throw err;
//         }
//         fs.writeFile(path.join(__dirname, 'task2', 'task2.txt'), `${data2}`, (err) => {
//             if (err) {
//                 throw err;
//             }
//             fs.unlink(path.join(__dirname,'classwork1_2.txt'),(err)=>{
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//             })
//         });
//     });
//
// });


// // 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// // (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// // і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать
// // - це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки,
// //     вам потрібно їх перейменувати і додати до назви префікс _new
//
// const crateFiles = () => {
//     fs.mkdir(path.join(__dirname, 'last_task', 'folder1'), (err) => {
//         if (err) {
//             throw err;
//         }
//     });
//     fs.mkdir(path.join(__dirname, 'last_task', 'folder2'), (err) => {
//         if (err) {
//             throw err;
//         }
//     });
//     fs.mkdir(path.join(__dirname, 'last_task', 'folder3'), (err) => {
//         if (err) {
//             throw err;
//         }
//     });
//     fs.mkdir(path.join(__dirname, 'last_task', 'folder4'), (err) => {
//         if (err) {
//             throw err;
//         }
//     });
//
//     fs.writeFile(path.join(__dirname, 'last_task', 'file1.txt'), `aaaaaaaaadddddddddddwwwwwwwwwwadsd213412`, (err) => {
//         if (err) {
//             throw err;
//         }
//
//     });
//
//     fs.writeFile(path.join(__dirname, 'last_task', 'file2.txt'), `qqqqqqqqqqqssssssddddddwadsd213412`, (err) => {
//         if (err) {
//             throw err;
//         }
//
//     });
//
//     fs.writeFile(path.join(__dirname, 'last_task', 'file3.txt'), `aaaaaaaffasersdfedsdfgfdsawefsdwwwwwwwwadsd213412`, (err) => {
//         if (err) {
//             throw err;
//         }
//
//     });
//
//     fs.writeFile(path.join(__dirname, 'last_task', 'file4.txt'), `artfgbhnjkasuiwekflsdljriemk;sdf13412`, (err) => {
//         if (err) {
//             throw err;
//         }
//
//     });
// };
// crateFiles();
//
//
// const readFolder = () => {
//     fs.readdir(path.join(__dirname, 'last_task'), (err, data) => {
//         if (err) throw err;
//         data.forEach(dat => {
//             if (dat.includes('.')) {
//                 fs.truncate(path.join(__dirname, 'last_task', dat), err => {
//                     if (err) throw err
//                 });
//             } else {
//                 fs.rename(path.join(__dirname, 'last_task', dat), path.join(__dirname, 'last_task', `new_${dat}`), err => {
//                     if (err) throw err
//                 });
//             }
//
//         });
//     });
// };
// readFolder()

