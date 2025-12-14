
# 📘 Unofficial Notes — Project Plan (Refined)

## 🎯 Objective

To build an end-to-end student portal that provides **organized academic resources**, **guided navigation**, and **student discussions**, starting with core functionality and expanding incrementally.

---

## 🔹 Core Functionality

* Centralized access to notes and academic resources
* Structured navigation by branch, semester, subject, unit, and chapter
* Student discussion through moderated, thread-based conversations
* Scalable backend design to support future features

---

## 🔐 Authentication & User Management Roadmap

### Phase 1 (In Progress)

* MongoDB integration ✅
* Email delivery using a custom email ID ✅
* OTP-based email verification system ✅
* Password reset functionality *(target: 22 Dec)*
* Customizable OTP email templates
* Terms & Conditions page
* Acceptance of Terms & Conditions during OTP verification

**Goal:**
Ensure secure and verified user access before enabling platform features.

---

## 📚 Notes & Academic Content System

### Phase 1

* Static HTML pages for:

  * Landing page
  * Branch selection:

    * CS
    * CS-AI
    * ECE
    * VLSI
    * Mechanical
    * Civil
  * Semester selection (Sem 1–8)
  * Subject selection (e.g., C Programming, ITC, Chemistry, BEE, DED, DTSI)

### Phase 2

* Dynamic API-based content loading:

  * Notes organized by **Unit → Chapter**
  * Centralized folders for:

    * Lesson Plans
    * Model Question Papers
    * Previous Year Question Papers

**Goal:**
Provide a clean, scalable content structure that can grow without redesign.

---

## 🧭 Campus Navigation System

### Phase 1: Data Collection

* Classroom locations with contextual details
* Washroom locations by building and floor (with reference images)
* Faculty cabin locations

### Phase 2: Visual Mapping

* Use building layouts (maps or blueprints)
* Overlay interactive markers and labels

### Phase 3: Navigation API

* Centralized API exposing location data

### Phase 4: Intelligent Query Interface

* Local AI-assisted navigation layer
* Converts natural-language queries into navigation guidance

**Goal:**
Help students quickly find locations using structured data, with scope for intelligent extensions.

---

## 💬 Discussion & Chat System

### Phase 1

* Thread-based discussion system (inspired by Reddit-style forums)
* Post-based discussions with comment hierarchies
* Community guidelines and moderation rules
* Explicit content detection and moderation tools
* User penalties and banning system for rule violations
* Reputation system for posts and contributors

**Goal:**
Encourage constructive discussion while maintaining a safe and moderated environment.

---
