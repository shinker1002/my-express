const express = require('express');
const router = express.Router();


// 그룹멤버 조회
router.get('/', (req, res)=> {
    res.send("groups/:id/members/")
});


//그룹 멤버 초대


//그룹 초대 추방


// 초대 수락, 거절 페이지


// 그룹 초대 수락


// 그룹 초대 거절


module.exports = router;