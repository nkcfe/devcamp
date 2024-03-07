# 배포 서버
쇼핑몰 + 회원가입 + 로그인 구현 진행중 (03. 07 업데이트)
<a href="https://devcamp-two.vercel.app/">vercel 배포 링크</a>

## 회원가입 폼 구현해보기 (1일차)

### 학습 내용
1. tailwind 유틸 함수 세팅 방법 <a href="https://fe-feed.vercel.app/posts/33">블로그 링크</a>
- eslint, prettier 세팅
- Next.js에서 tailwind를 추천하는 이유
- twMerge와 cva를 함께 사용해주는 커스텀 유틸함수 생성 방법.


2. shadcn/ui 사용방법 <a href="https://fe-feed.vercel.app/posts/34">블로그 링크</a>
- 재사용 가능한 컴포넌트의 장점 및 사용 방법


3. zod 사용방법 <a href="https://fe-feed.vercel.app/posts/35">블로그 링크</a>
- 타입스크립트 기반의 스키마 유효성 검사 라이브러리의 장점 및 사용 방법


## 예시 코드 확인해보기 (2일차)

### 학습내용
1. shadcn/ui를 활용한 다크모드 구현하기 <a href="https://fe-feed.vercel.app/posts/42">블로그 링크</a>
- Next.js의 themeProvider 사용방법 학습
- shadcn/ui의 dropdown 메뉴 사용 방법

2. shadcn/ui를 활용한 토스트 구현하기 <a href="https://fe-feed.vercel.app/posts/44">블로그 링크</a>
- react-toastify에서 shadcn/ui toast로 교체

3. shadcn/ui 분석 - forwardRef 사용방법 및 사용이유 <a href="https://fe-feed.vercel.app/posts/43">블로그 링크</a>
- forwardRef의 사용 방법 및 사용 이유 학습
- React의 렌더링 방법과 ref의 연관관계 학습


## 회원가입 폼 구현해보기 (3일차)

### 학습내용
1. Next.js + Prisma + PostgreSQL 데이터 베이스 연결하기 <a href="https://fe-feed.vercel.app/posts/45">블로그 링크</a>
- Next.js의 서버리스 특성을 살려 풀스택 웹페이지를 만드는 방법 학습

2. Next.js의 API Route 학습 <a href="https://fe-feed.vercel.app/posts/46">블로그 링크</a>
- 핵심 기능 및 단점 학습
- page router & app router 차이점 학습

3. 인증, 인가, 쿠키, 세션, JWT 토큰 학습 <a href="https://fe-feed.vercel.app/posts/48">블로그 링크</a>
- 인증과 인가의 차이점
- 인증 방식의 종류와 장단점 (쿠키, 세션, 토큰) 
- JWT 토큰의 개념과 구조, 작동 방법 및 장단점 학습
- Refresh 토큰의 역할 학습

4. Access Token & Refresh Token <a href="https://fe-feed.vercel.app/posts/50">블로그 링크</a>
- 함께 사용하게 된 배경과 사용 프로세스 학습
- Refresh 토큰의 안정성과 추가적인 보안방법 Refresh Token Rotate 학습

5. bcrypt로 비밀번호 해싱 <a href="https://fe-feed.vercel.app/posts/51">블로그 링크</a>
- 해싱과 솔팅의 개념
- bcrypt의 작동 방식
- 라이브러리를 활용한 적용

6. Next-Auth <a href="https://fe-feed.vercel.app/posts/47">블로그 링크1</a><a href="https://fe-feed.vercel.app/posts/49">블로그 링크2</a>
- Next Auth의 인증 방식과 특징과 작동 방식 학습
- Next Auth를 활용한 소셜로그인 (구글, 깃허브, 네이버) 및 Credential 로그인 구현
- 미들웨어를 활용하는 방법


## 쇼핑몰 구현하기 (4일차)

### 학습내용
1. shadcn을 이용한 쇼핑몰 페이지 스타일링
아래 컴포넌트 활용
- Dropdown
- Drawer
- Dialog
- Carousel
- Tab

2. Prisma + Supabase로 Data Seed 작업 진행
- 하드코딩한 목업데이터를 데이터베이스로 이관작업

3. SSG, SSR, cache를 학습 및 활용해보기
- 상세페이지 product : 데이터가 변동될 일이 거의 없기 떄문에 SSG를 활용
- 메인페이지 products : 데이터가 추가되거나 삭제될 일이 있기 때문에 SSR을 활용.
- React Server Component에서 도입된 cache로 최적화 진행