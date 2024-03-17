### 배포 서버
<a href="https://devcamp-two.vercel.app/">Preview</a>

### 프로젝트 소개
Next.js를 활용한 풀스택 쇼핑몰 웹사이트 구현 (1인 프로젝트)

### 프로젝트 기간
2024.03.05 ~ 2024.03.15

### 목적
- Next.js app router와 api route 학습
- next auth를 활용한 인증 시스템 학습
- toss payments를 활용한 결제 시스템 학습
- 장바구니, 쿠폰, 포인트 등 결제 로직 학습
- shadcn/ui + zod를 활용한 스타일링 및 유효성 검증 학습


### 구현 범위
- next-auth를 활용한 소셜로그인 및 이메일 로그인
- 장바구니 시스템
- 쿠폰 및 포인트 적용 시스템
- kakao 주소 검색 api를 활용한 배송지 정보 검색
- toss payments api를 활용한 결제 시스템 구축 (진행중)


### 기술 스택
- Typescrip + React + Next.js
- Prisma + PostgreSQL
- Tailwind + Framer Motion + Shadcd/ui + headless/ui
- Tanstack-Query + axios
- Zustand
- Next-Auth
- zod

### 주요 기능
- 인증
  - next-auth를 활용한 인증 시스템 구현
  - 구글, 깃허브, 네이버, 이메일을 이용한 회원가입 및 인증
  - jwt토큰을 활용한 인증 시스템 및 리프레시 토큰으로 엑세스 토큰 발급

- 장바구니
  - 회원만 사용 가능.
  - 최초 장바구니 사용 시 장바구니 테이블 생성
  - 기존 장바구니가 있을 경우 장바구니 테이블 업데이트

- 주소 검색
  - kakao 주소 검색 api를 활용한 배송지 정보 검색 및 입력

- 포인트
  - 회원가입시 최초 10,000 포인트 지급
  - 결제 시 최종 결제 금액의 1%적립
  - 포인트가 최종 결제 금액보다 많을 경우 최종 결제금액까지만 사용 가능
  - 쿠폰이 등록될 경우 포인트는 다시 설정

- 쿠폰 
  - 쿠폰은 정액제 (3000원 할인), 정률제 (30%할인)으로 구성
  - 관리자가 등록한 쿠폰 코드만 사용 가능 (현재 아래 등록된 쿠폰만 사용 가능)
    - helloworld_fixed (3000원 할인 쿠폰)
    - helloworld_percentage (30% 할인 쿠폰)
  - 사용자는 관리자가 지급한 쿠폰 코드로 적용 가능
  - 만료 기한을 넘길 경우 쿠폰 사용 불가
  - 포인트보다 쿠폰 선적용 시스템 (정률제의 경우 최종 결제 금액 차이가 있기 때문)
  
- 결제 시스템
  - toss payments api를 활용한 결제 시스템
  - 최종 결제한 유저의 결제 데이터는 db로 관리
  - 결제시 사용한 포인트, 쿠폰은 소멸