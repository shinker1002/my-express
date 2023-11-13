// const { groups, groupId, increase, decrease } = require("../repository/groups");

const { groups } = require("../repository/groups");
const groupsData = groups;

const express = require('express');
const router = express.Router();


// 전체 그룹 조회
router.get('/', (req, res)=> {
    const search = req.query.search

    // 검색
    if(search) {
        let searchData = groupsData.filter((el, idx)=> {
            return el.groupDescription.includes(search) || el.groupName.includes(search)
        })
        res.send({groups: searchData})
    }else {
        res.send({groups: groupsData});
    }
    
});


// 그룹 생성
router.post('/', (req, res)=> {
    let groupName = req.body.groupName;
    let groupDescription = req.body.groupDescription;
    let members = req.body.members;

    // 입력 값 확인.
    if(!(groupName && groupDescription)) {
        return res.status(400).send('입력 데이터 부족.')
    }

    let temp = {
        groupId: parseInt(Math.random() * 100000),
        groupName: groupName,
        groupDescription: groupDescription,
        members: members ? members : [],
        channels: []
    }
    // console.log(temp);
    // increase();
    groups.push(temp)

    res.status(201).send(temp)
});


// 특정 그룹 조회
router.get('/:id', (req, res)=> {
    
    const id = Number(req.params.id)

    let temp = groups.filter((el, idx) => {
        return el.groupId === id
    })[0]

    return temp.length ? res.status(200).send(temp) : res.status(404).send(temp)
});


// 그룹 정보 수정
router.patch('/:id', (req, res)=> {
    const id = Number(req.params.id)
    const data = req.body;

    // 입력 값 유효성 검사.
    if(!(data.groupName && data.groupDescription)) {
        return res.status(400).send('입력 데이터 부족.')
    }

    // 기존 데이터 가져오기
    let temp = groupsData.filter((el, idx) => {
        return el.groupId === id
    });
    
    // 데이터가 없을 경우.
    if (temp.length === 0) return res.status(404).send('데이터를 찾지 못함.')

    // 데이터 수정
    for( key of Object.keys(data)) {
        temp[0][key] = data[key]
    };

    res.status(200).send(temp[0]);
});


// 그룹 삭제
router.delete('/:id', (req, res)=> {
    const id = Number(req.params.id)

    // 데이터 찾기
    const idx = groupsData.findIndex((el)=> {
        return el.groupId === id
    })

    // 데이터 삭제
    if(idx !== -1) {
        groupsData.splice(idx, 1);
        return res.status(200).send("삭제 완료.")
    } else {
        res.status(404).send("삭제 실패.")
    }

});

module.exports = router;