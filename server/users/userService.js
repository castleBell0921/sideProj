const bcrypt = require('bcryptjs');
const pool = require('../config/db'); // DB 연결 모듈 가져오기

const userService = async (id, password, email, name, nickname, phone, socialId) => {
  const connection = await pool.getConnection(); // DB 연결을 가져옵니다.
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log('in service!');
    // 회원가입 정보 저장
    const [result] = await connection.execute(
        'INSERT INTO users (USER_NO, ID, PWD, PHONE, EMAIL, NICKNAME, STATE, TRUST, REGION, BEDGE, CREATE_DATE, IS_ADMIN, NAME,SOCIAL_ID) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, DEFAULT, DEFAULT, ?, ?)',
        [id, hash,  phone, email, nickname, 'N', 0, 'defaultRegion', 'defaultBadge', name, socialId]
    );

    // 성공적으로 추가된 사용자 정보 반환
    return { id, email, password, phone, name, nickname }; // 실제로는 비밀번호를 해시화해서 저장하는 게 좋습니다.
  } catch (error) {
    throw new Error(error.message); // 에러 발생 시 메시지 반환
  } finally {
    connection.release(); // 연결 종료
  }
};

const checkIdAvailability = async(id) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
        'select count(*) as count from users where id = ?',
        [id]
    );
    return rows[0].count > 0;
  } catch(error) {
    throw new Error(error.message);
  } finally {
    connection.release();
  }
}

const loginService = async(id, pwd) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
        'select *  from users where id = ?',
        [id]
    );

    if(rows.length == 0) {
      return{  success:false, message: '존재하지 않는 아이디입니다.'};
    }

    const hashedPasswordFromDB = rows[0].pwd;
    const isPasswordMatch = await bcrypt.compare(pwd,hashedPasswordFromDB);

    if(isPasswordMatch) {
      return{ inform: rows[0], success: true};
    }else {
      return{success:false, message: '비밀번호가 일치하지 않습니다.'};
    }
  }catch(error){
    console.error('로그인 오류', error);
    return{success: false, message: '로그인 처리 중 오류 발생'};
  } finally {
    connection.release();
  }
}
module.exports = { userService, checkIdAvailability, loginService };
