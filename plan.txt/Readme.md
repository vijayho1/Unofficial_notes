

# 📘 Student Portal Project

## 🚀 Overview
A complete end-to-end portal designed for students to:
- Access **notes** by branch, semester, and subject.
- Navigate the campus with **interactive maps** and location-based info.
- Engage in a **community chat system** with moderation and reputation features.
- Securely log in with **OTP verification, password reset, and Terms & Conditions acceptance**.

This project blends **full-stack development** with **user-centric design**, aiming to create a one-stop solution for academic and campus needs.

---

## 🔑 Authentication Features (Phase 1)
- ✅ MongoDB integration for credential storage.
- ✅ Custom email service for sending OTPs.
- ✅ OTP functionality for secure verification.
- 🔄 Password reset functionality (target: Dec 22).
- 🔄 Customization of OTP email text.
- 🔄 Terms & Conditions page (verification = acceptance).

---

## 📚 Notes Features (Phase 1)
- **Landing Page** → Branch → Semester → Subject → Units/Chapters.
- Supported branches: CS, CS-AI, ECE, VLSI, Mech, Civil.
- Supported semesters: 01–08.
- Subjects include: C Programming, ITC, Chemistry, BEE, DED, DTSI.
- Dynamic API pulling for:
  - Units & chapters.
  - Extra folders: lesson plans, model QPs, PYQs.

---

## 🗺️ Navigation Features
**Phase 1: Data Collection**
- Class numbers with course details.
- Washroom locations (with photos).
- Teacher cabin locations.

**Phase 2: Map Creation**
- Use Google Maps screenshots or blueprints.
- Add interactive pointers.

**Phase 3: API Development**
- Serve navigation data via REST API.

**Phase 4: AI Integration**
- Local AI assistant to provide quick directions.

---

## 💬 Chat System
**Phase 1: Moderated Community**
- Explicit word detection.
- Strict banning rules.
- Clear guidelines.

**Design Inspiration:**
- Reddit-style threads.
- Commenting system.
- Post reputation (upvotes/downvotes).

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** Custom email service, OTP, password reset
- **Future Integration:** AI assistant for navigation queries

---

## 📅 Roadmap
- **Dec 2025:** Complete password reset + Terms & Conditions.
- **Jan 2026:** Notes portal HTML pages + dynamic API.
- **Feb 2026:** Navigation data collection + map prototype.
- **Mar 2026:** Chat system MVP with moderation.
- **Apr 2026:** AI integration for navigation.

---

## 🤝 Contribution
- Fork the repo and submit PRs.
- Report issues via GitHub Issues.
- Suggestions for new features are welcome!

---

## 📜 License
This project is licensed under the MIT License — feel free to use and adapt with attribution.


