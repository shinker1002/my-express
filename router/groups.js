// const { groups, groupId, increase, decrease } = require("../repository/groups");

const { groups } = require("../repository/groups");
const { users } = require("../repository/users");

const groupsData = groups;

const express = require('express');
const router = express.Router();

let groupId = 3

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
        groupId: groupId++,
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
router.get('/:groupId', (req, res)=> {
    
    const groupId = Number(req.params.groupId)

    let temp = groups.filter((el, idx) => {
        return el.groupId === groupId
    })[0]

    return temp.length ? res.status(200).send(temp) : res.status(404).send(temp)
});


// 그룹 정보 수정
router.patch('/:groupId', (req, res)=> {
    const groupId = Number(req.params.groupId)
    const data = req.body;

    // 입력 값 유효성 검사.
    if(!(data.groupName && data.groupDescription)) {
        return res.status(400).send('입력 데이터 부족.')
    }

    // 기존 데이터 가져오기
    let temp = groupsData.filter((el, idx) => {
        return el.groupId === groupId
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
router.delete('/:groupId', (req, res)=> {
    const groupId = Number(req.params.groupId)

    // 데이터 찾기
    const idx = groupsData.findIndex((el)=> {
        return el.groupId === groupId
    })

    // 데이터 삭제
    if(idx !== -1) {
        groupsData.splice(idx, 1);
        return res.status(200).send("삭제 완료.")
    } else {
        res.status(404).send("삭제 실패.")
    }

});





// 그룹 멤버 조회
router.get('/:groupId/members', (req, res)=> {
    const params = req.params;
    const search = req.query.search;

    // 그룹 멤버 가져오기
    let members = groups.filter((el) => {
        return el.groupId === Number(params.groupId);
    })[0].members
    
    if (!search) {
        return res.send({members: members})

    }else {
        let searchMember = members.filter((el) => {
            return el.name.includes(search);
        })
        
        return res.send({members: searchMember})
    }
});


//그룹 멤버 초대
router.post('/:groupId/members', (req, res)=> {
    const params = req.params;
    
    // 그룹 가져오기
    let group = groups.filter((el) => {
        return el.groupId === Number(params.groupId);
    })

    // 그룹 멤버 가져오기
    let members = group[0].members
    
    // 초대한 멤버 중복 제거
    let inviteMember = new Set(req.body.inviteMember);
    inviteMember = [...inviteMember]

    // 유저 테이블에 존재하는 사람인지 확인하기
    // 존재하지 않으면 잘못된 초대라고 응답.
    let inviteTemp = [...inviteMember];

    for(let i = 0; i < users.length; i++) {
        if(inviteTemp.includes(users[i].userEmail)) {
            let idx = inviteTemp.indexOf(users[i].userEmail)
            inviteTemp.splice(idx, 1)
        }
    }

    if(inviteTemp.length !== 0) {
        return res.status(400).send("존재하지 않는 사용자가 있습니다 \n " + inviteTemp)
    }
    // 반복문 돌면서 이미 가입되어있는 사람 찾기
    let duplication = [];

    for(let i = 0; i < members.length; i++) {
        let check = inviteMember.includes(members[i].userEmail)

        if (check) {
            duplication.push(members[i].userEmail)
        }

    }

    // 이미 가입된 회원이 없으면 초대 성공
    if(duplication.length === 0) {
        // 이메일에 해당하는 유저 정보 가져오기
        for(let invite of inviteMember) {
            for (let i = 0; i < users.length; i++) {
                // groups.member에 추가
                if (users[i].userEmail === invite) {              
                    members.push(users[i])
                    break;
                }
            }
        }
        return res.status(200).send("초대 완료")

    } else {
        return res.status(400).send("이미 가입된 회원이 있습니다. \n" + `${duplication}`)
    }
     
});


//그룹 멤버 추방
router.delete('/:groupId/members/:memberId', (req, res)=> {
    const groupId = Number(req.params.groupId);
    const memberId = Number(req.params.memberId);
 
    let members = groups.filter((el) => {
        return el.groupId === Number(groupId);
    })[0].members

    
    for(let i = 0; i < members.length; i++) {
        let member = members[i]
        if(member.userId === memberId) {
            members.splice(i, 1)
        }
    }


    return res.status(200).send("그룹 멤버 추방.")
     
});


module.exports = router;