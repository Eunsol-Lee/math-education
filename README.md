# 📚 MathKids - 아이들 계산 능력 함양 프로젝트

> 아이들이 재미있게 배우는 계산 학습 플랫폼

## 🎯 프로젝트 개요

**MathKids**는 초등학교 저학년 아이들(6-10세)의 기초 계산 능력 향상을 위한 게임화된 온라인 학습 플랫폼입니다.

### 🌟 주요 특징

- 🎮 **게임화된 학습**: 포인트, 배지, 레벨업 시스템으로 재미있게 학습
- 📊 **개인별 맞춤 학습**: AI 기반 난이도 자동 조절 및 개인화 추천
- 👨‍👩‍👧‍👦 **부모 모니터링**: 자녀의 학습 진도와 성취도를 실시간으로 확인
- 📱 **모바일 친화적**: 태블릿, 스마트폰에서도 최적화된 학습 경험
- 🔒 **안전한 환경**: 아이들을 위한 안전하고 보호된 학습 공간

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Validation**: Zod
- **Forms**: React Hook Form

## 📋 프로젝트 문서

### 📖 기획 문서

- [📋 프로젝트 기획서](./docs/PROJECT_PLAN.md) - 전체 프로젝트 개요, 목표, 핵심 기능
- [🏗️ 기술 아키텍처](./docs/TECHNICAL_ARCHITECTURE.md) - 시스템 설계 및 기술 스택 상세
- [🗄️ 데이터베이스 스키마](./docs/DATABASE_SCHEMA.md) - 완전한 DB 설계 및 ERD
- [🎨 UI/UX 설계](./docs/UI_UX_DESIGN.md) - 디자인 시스템 및 페이지 구조
- [🚀 개발 로드맵](./docs/DEVELOPMENT_ROADMAP.md) - 16주 개발 계획 및 마일스톤

### 🎯 주요 기능

#### 학습자 (아이들)

```
✨ 레벨별 단계적 학습
🎯 일일 목표 및 챌린지
🏆 성취 시스템 (포인트, 배지, 레벨)
📚 오답노트 및 복습 기능
🎵 사운드 및 애니메이션 피드백
```

#### 관리자 (부모/교사)

```
📊 실시간 학습 현황 모니터링
📈 상세 학습 분석 리포트
⚙️ 개인별 학습 계획 설정
🔔 학습 알림 및 리마인더
👥 다중 자녀 관리
```

#### 시스템 기능

```
🤖 AI 기반 난이도 자동 조절
🔒 안전한 사용자 인증 시스템
📱 완전한 반응형 디자인
♿ 접근성 지원 (WCAG 2.1 AA)
🌐 다국어 지원 준비
```

## 🗂️ 프로젝트 구조

```
math-education/
├── docs/                     # 📚 프로젝트 문서
│   ├── PROJECT_PLAN.md       # 기획서
│   ├── TECHNICAL_ARCHITECTURE.md  # 기술 아키텍처
│   ├── DATABASE_SCHEMA.md    # DB 설계
│   ├── UI_UX_DESIGN.md      # UI/UX 설계
│   └── DEVELOPMENT_ROADMAP.md # 개발 로드맵
├── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # React 컴포넌트
│   ├── lib/                  # 유틸리티 및 설정
│   └── types/               # TypeScript 타입 정의
├── public/                   # 정적 파일
├── supabase/                # Supabase 설정
│   ├── migrations/          # DB 마이그레이션
│   └── seed.sql            # 시드 데이터
└── package.json
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary Blue**: `#3B82F6` - 메인 색상
- **Success Green**: `#10B981` - 정답/성공
- **Warning Yellow**: `#F59E0B` - 힌트/주의
- **Error Red**: `#EF4444` - 오답/오류
- **Special Purple**: `#8B5CF6` - 특별함/보상

### 타이포그래피

- **Display Font**: Comic Neue (친근한 제목용)
- **Body Font**: Noto Sans KR (가독성 좋은 본문용)
- **Mono Font**: JetBrains Mono (숫자/코드용)

## 📊 주요 데이터베이스 테이블

```
👤 profiles (사용자 프로필)
├── 기본 정보, 역할, 부모-자녀 관계
└── 학습 설정 및 선호도

📚 problems (문제 은행)
├── 카테고리별 문제 데이터
└── 난이도, 해설, 힌트

📈 user_progress (학습 진도)
├── 개인별 레벨 및 성취도
└── 학습 통계 및 분석

🎯 problem_attempts (문제 시도)
├── 모든 학습 활동 기록
└── 성능 분석용 데이터

🏆 achievements (업적 시스템)
├── 게임화 요소 관리
└── 동기부여 시스템
```

## 🚀 개발 로드맵 (16주)

### Phase 1: 기초 구조 (1-4주)

- ✅ 개발 환경 설정
- ✅ Supabase 연동
- ✅ 인증 시스템
- ✅ 기본 대시보드

### Phase 2: 핵심 기능 (5-10주)

- 🔄 문제 관리 시스템
- 🔄 학습 진도 추적
- 🔄 게임화 요소
- 🔄 학습 인터페이스

### Phase 3: 고도화 (11-14주)

- ⏳ 부모 대시보드
- ⏳ 성능 최적화
- ⏳ 접근성 개선
- ⏳ 다국어 지원

### Phase 4: 배포 (15-16주)

- ⏳ 프로덕션 배포
- ⏳ 모니터링 시스템
- ⏳ 사용자 테스트
- ⏳ 공식 런칭

## 📈 성공 지표 (KPI)

### 사용자 참여도

- 일일 활성 사용자 (DAU)
- 평균 세션 시간
- 문제 완료율
- 사용자 유지율

### 학습 효과

- 정답률 향상도
- 문제 해결 속도 개선
- 지속적 학습일 수
- 레벨업 달성률

### 비즈니스 지표

- 사용자 증가율
- 부모 만족도
- 추천률 (NPS)
- 수익 전환율

## 🔒 보안 및 개인정보 보호

### 데이터 보안

- HTTPS 강제 적용
- JWT 토큰 기반 인증
- Row Level Security (RLS)
- SQL Injection 방지

### 개인정보 보호

- 최소한의 개인정보 수집
- 데이터 암호화 저장
- GDPR/COPPA 준수
- 명확한 개인정보 처리방침

## 🎯 타겟 사용자

### 주 사용자 (아이들)

- **연령**: 6-10세 (초등학교 저학년)
- **학습 목표**: 기초 계산 능력 향상
- **사용 환경**: 태블릿, 스마트폰, PC

### 보조 사용자 (부모/교사)

- **관심사**: 자녀/학생의 학습 진도
- **니즈**: 체계적인 학습 관리
- **기대**: 명확한 성과 측정

## 🌟 차별화 포인트

1. **아이 중심 UX**: 직관적이고 재미있는 인터페이스
2. **개인화**: AI 기반 맞춤형 학습 경로
3. **안전성**: 아이들을 위한 보호된 환경
4. **투명성**: 부모를 위한 상세한 학습 분석
5. **접근성**: 다양한 디바이스와 능력 수준 지원

## 🚀 Getting Started

```bash
# 개발 서버 실행
npm run dev
# or
yarn dev
# or
pnpm dev

# 브라우저에서 http://localhost:3000 접속
```

## 📞 문의 및 지원

- **개발팀 이메일**: dev@mathkids.com
- **사용자 지원**: support@mathkids.com
- **파트너십**: partnership@mathkids.com

---

## 📄 라이선스

이 프로젝트는 교육 목적으로 개발되었으며, 관련 라이선스는 추후 결정될 예정입니다.

---

**마지막 업데이트**: 2024년 10월 6일  
**프로젝트 상태**: 📋 기획 완료, 🚀 개발 준비 중
