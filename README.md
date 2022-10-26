# 원티드 프리온보딩 프론트엔드 - 선발 과제

wanted-pre-onboarding-frontend에 지원한 심의석입니다.

## 프로젝트의 실행 방법

1. 프로젝트의 최상단 폴더에 .env파일 생성합니다.

   ```
   REACT_APP_SERVER_URL=https://pre-onboarding-selection-task.shop
   ```

2. 다음 명령어로 필요한 의존성 패키지들을 설치합니다.

   ```
   npm install
   ```

3. 다음 명령어로 프로젝트 시작합니다.

   ```
   npm start
   ```

## 배포링크

https://wanted-pre-onboarding-frontend-two.vercel.app

## 코드리뷰

### 프로젝트 아키텍쳐

```
.
├── README.md
└── client
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── index.html
    └── src
        ├── App.js
        ├── assets
        │   └── svg
        ├── components
        │   ├── Button.jsx
        │   ├── Input.jsx
        │   ├── login
        │   │   └── LoginForm.jsx
        │   ├── signup
        │   │   └── SignupForm.jsx
        │   └── todo
        │       ├── TodoBox.jsx
        │       ├── TodoInput.jsx
        │       └── TodosList.jsx
        ├── constants
        │   ├── message.js
        │   └── regex.js
        ├── index.css
        ├── index.js
        ├── pages
        │   ├── LogIn.js
        │   ├── SignUp.js
        │   └── TodoList.js
        ├── styles
        │   ├── globalstyles.js
        │   └── root.css
        └── utils
            ├── apis
            │   ├── authApi.js
            │   ├── instance.js
            │   └── todoApi.js
            └── localstorage.js
```

</br>

```
src 폴더 안에 크게 컴포넌트, assets, constants, pages, styles, utils 기능별로 폴더로 나누었다.
App.js파일에서는 라우트경로를 설정해주었다.

```

| 폴더       | 폴더 내용                                                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| components | 기능별로 login, signup, todo 폴더를 만들고 그안에 작은 단위의 컴포넌트 들로 나누었다. 공통으로 재사용 되는 버튼 이나 인풋 컴포넌트는 따로 뺴서 재사용 할 수 있도록 하였다. |
| constants  | 로그인 및 회원가입에 필요한 메세지들과 유효성 검사 코드와 같이 변하지 않는 값들은 contants 폴더에 넣어 사용하도록 하였다.                                                  |
| pages      | 프로젝트에 필요한 페이지 별로 나누어 페이지 컴포넌트에는 작은 단위의 컴포넌트 조합들로만 이루어지게끔 하였다.                                                              |
| styles     | 전역 스타일링 및 반복되는 스타일들을 지정하여 사용하도록 하였다.                                                                                                           |
| utils      | api나 로컬스토리지에 토큰을 담는 로직을 분리하여 utils 폴더에 넣었다.                                                                                                      |
| assets     | 프로젝트에 필요한 svg나 img들을 따로 asset폴더에 분리하고자 하였다.                                                                                                        |

</br>

### 코드의 가독성

- 코드의 역할을 변수명을 통해 알 수 있도록 명확히 쓰려고 하였다.
- 비슷한 역할의 변수명은 통일성을 갖도록 하였다.

### 컴포넌트의 분리

- CDD를 이용하여 컴포너트의 재사용을 높힘.
  </br>
  </br>
  <반복되는 input&button 컴포넌트 - props를 받도록 하여 재사용성을 높힘>

```js
//button
const Button = ({
  mode,
  shadow,
  text,
  ftsize,
  padding,
  type,
  disabled,
  onSubmit,
}) => {
  const { bgcolor, ftcolor } = COLOR[mode];
  return (
    <Container
      ftcolor={ftcolor}
      bgcolor={bgcolor}
      shadow={shadow}
      ftsize={ftsize}
      padding={padding}
      type={type}
      disabled={disabled ?? false}
      onClick={onSubmit}
    >
      {text}
    </Container>
  );
};

//input
const Input = forwardRef(
  (
    { width, height, onChange, type, value, placeholder, id, bdcolor, checked },
    ref
  ) => {
    return (
      <>
        <Inputs
          placeholder={placeholder}
          width={width}
          height={height}
          id={id}
          type={type}
          bdcolor={bdcolor}
          onChange={onChange}
          value={value}
          ref={ref}
          checked={checked}
        ></Inputs>
      </>
    );
  }
);
```

- axios interceptor를 통한 코드 간결화 및 추상화, 비즈니스 로직의 분리
  </br>
  </br>
  <api instance를 생성함으로서 server url 코드를 반복하지 않음 & api를 함수로 추상화 시켜 ui로직으로부터 비즈니스 로직을 분리>

```js
//토큰이 필요한 instance
const authCreateInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 2000,
    headers: { "Content-Type": "application/json" },
  });
  return Interceptors(instance);
};

const authRequest = authCreateInstance();

//토큰이 필요없는 instance
const authAPI = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});
```

</br>
</br>

< api 요청을 가로채 토큰을 넣어줌으로서 각 요청마다 토큰을 넣어주는 코드 중복 방지 >

```js
function Interceptors(instance) {
  instance.interceptors.request.use(
    (config) => {
      const access_token = getToken();
      if (config.headers && access_token)
        config.headers.Authorization = `Bearer ${access_token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  return instance;
}
```

### 불필요한 랜더링 방지

이번 프로젝트에서 input에 값을 입력할 때 상태변화에 따른 리랜더링을 방지하기 위하여 useRef()를 사용하였다.
</br>
리액트는 virtual DOM 을 사용하기 때문에 특정 DOM 을 선택할때 Vanilla JS 에서 사용하던 방식인 querySelector 를 사용하는 방식을 지양해야 한다. 이를 대체하기 위해 useRef 를 사용하였다.
</br>
input 컴포넌트가 재사용 됨에 따라 useRef를 props로 넘겨주어야 했는데 이 때, props를 받는 하위 컴포넌트에서 그냥 변수로 받아지지 않고 forwardRef()로 한번 감싸주어야 했다.

````js

// 상위 컴포넌트
const LoginForm = () => {

const emailRef = useRef(null);

return( <>
         <Input
          ```생략```
          ref={emailRef}/>
        </>
)}

//하위 input 컴포넌트
const Input = forwardRef(
  (props, ref) => {
    return (
      <>
        <Inputs
        ```생략```
          ref={ref}
        ```생략``` />
      </>
    );
  }
);

````
