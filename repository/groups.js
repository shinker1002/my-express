const groups = [
   {
    groupId: 1,
    groupName: "제머나이소프트",
    groupDescription: "제머나이소프트 기술본부 멤버",
    members: [
		{
            userId: 123,
            userEmail: "shinker98@naver.com",
            name: "최민수"
        }
	],
    channels: [
        {
            channelId: 1,
            channelName: "기술본부",
            authority: [
                {
                    userId: 123,
                    userEmail: "shinker98@naver.com",
                    name: "최민수"
                },
                {
                    userId: 124,
                    userEmail: "shinker1998@naver.com",
                    name: "김민수"
                }
            ]
        }
    ],
  },
  {
    groupId: 2,
    groupName: "LG CNS",
    groupDescription: "LG CNS 개발 팀",
    members: [
		{
            userId: 1,
            userEmail: "qwer1234@naver.com",
            name: "이민수"
        },
        {
            userId: 2,
            userEmail: "shinker98@gmail.com",
            name: "박민수"
        }
	],
    channels: [
        {
            channelId: 2,
            channelName: "개발 팀",
            authority: [
                {
                    userId: 1,
                    userEmail: "qwer1234@naver.com",
                    name: "이민수"
                },
                {
                    userId: 2,
                    userEmail: "shinker98@gmail.com",
                    name: "박민수"
                }
            ]
        }
    ],
  }
]

module.exports = {
    groups
}