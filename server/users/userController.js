const { userService, checkIdAvailability, loginService  } = require('../users/userService'); 

const signUp = async(req, res) => {
    const { id, password, email, name, nickname, phone, socialId} = req.body;
    // console.log(req.body);
    try {
        const result = await userService(id, password, email, name, nickname, phone, socialId);
        res.status(201).json({message : '회원가입 성공', data: result});
    } catch(error) {
        console.error('회원가입 실패 (Controller):', error); // 서버 콘솔에 자세한 에러 로그
        res.status(400).json({message: error.message});
    }
};

const checkId = async(req, res) => {
    const  { id }  = req.query;
    console.log('id : ' + id);

    if(!id) {
        return res.status(400).json({message: '아이디를 입력해주세요.'});
    }

    try {
        const isIdTaken = await checkIdAvailability(id);
        res.json({ available : !isIdTaken});
    } catch(error) {
        console.error('아이디 중복 오류 (Controller): ', error);
        res.status(500).json({message: '서버 오류 발생'});
    }
}

const login = async(req, res) => {
    const {id, password } = req.body;
    try {
        const result = await loginService(id, password);

        if(result.success) {
            req.session.user = {
                inform: result.inform
            };
            req.session.isLoggendIn = true;
            return res.status(200).json({ message: '로그인 성공', user: req.session.user, success: true });
        } else {
            return res.status(401).json({ message: result.message, success: false });
        }
        
    } catch(error) {
        console.error('로그인 실패 (Controller):', error); // 서버 콘솔에 자세한 에러 로그
        res.status(400).json({message: error.message, success: false});
    }
}
const logout = async(req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error('세션 삭제 실패',err);
            return res.status(500).json({ message: '로그아웃 실패' });
        } else {
            res.clearCookie('connect.sid'); // 세션 쿠키 이름에 따라 변경
            res.status(200).json({ message: '로그아웃 성공' });
        }
    })
}

module.exports = {signUp, checkId, login, logout};