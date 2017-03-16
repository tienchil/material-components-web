/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {MDCComponent} from '@material/base';
import MDCDialogFoundation from './foundation';
import * as util from './util';

export {MDCDialogFoundation};

export class MDCDialog extends MDCComponent {
  static attachTo(root) {
    return new MDCDialog(root);
  }

  get open() {
    return this.foundation_.isOpen();
  }

  set open(value) {
    if (value) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  get acceptButton_() {
    return this.root_.querySelector(MDCDialogFoundation.strings.ACCEPT_SELECTOR);
  }

  get cancelButton_() {
    return this.root_.querySelector(MDCDialogFoundation.strings.CANCEL_SELECTOR);
  }

  get dialogSurface_() {
    return this.root_.querySelector(MDCDialogFoundation.strings.DIALOG_SURFACE_SELECTOR);
  }

  getDefaultFoundation() {
    const {FOCUSABLE_ELEMENTS, SCROLL_LOCK_TARGET} = MDCDialogFoundation.strings;

    return new MDCDialogFoundation({
      hasClass: (className) => this.root_.classList.contains(className),
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      addScrollLockClass: () =>
        document.querySelector(SCROLL_LOCK_TARGET).classList.add(MDCDialogFoundation.cssClasses.SCROLL_LOCK),
      removeScrollLockClass: () =>
        document.querySelector(SCROLL_LOCK_TARGET).classList.remove(MDCDialogFoundation.cssClasses.SCROLL_LOCK),
      registerInteractionHandler: (evt, handler) =>
        this.root_.addEventListener(evt, handler, util.applyPassive()),
      deregisterInteractionHandler: (evt, handler) =>
        this.root_.removeEventListener(evt, handler, util.applyPassive()),
      registerDialogSurfaceInteractionHandler: (evt, handler) =>
        this.dialogSurface_.addEventListener(evt, handler),
      deregisterDialogSurfaceInteractionHandler: (evt, handler) =>
        this.dialogSurface_.removeEventListener(evt, handler),
      registerDocumentKeydownHandler: (handler) => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => document.removeEventListener('keydown', handler),
      registerAcceptHandler: (handler) => this.acceptButton_.addEventListener('click', handler),
      deregisterAcceptHandler: (handler) => this.acceptButton_.removeEventListener('click', handler),
      registerCancelHandler: (handler) => this.cancelButton_.addEventListener('click', handler),
      deregisterCancelHandler: (handler) => this.cancelButton_.removeEventListener('click', handler),
      registerFocusTrappingHandler: (handler) => document.addEventListener('focus', handler, true),
      deregisterFocusTrappingHandler: (handler) => document.removeEventListener('focus', handler, true),
      numFocusableElements: () => this.dialogSurface_.querySelectorAll(FOCUSABLE_ELEMENTS).length,
      setDialogFocusFirstTarget: () => this.dialogSurface_.querySelectorAll(FOCUSABLE_ELEMENTS)[0].focus(),
      setInitialFocus: () => this.acceptButton_.focus(),
      getFocusableElements: () => this.dialogSurface_.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: (el) => util.saveElementTabState(el),
      restoreElementTabState: (el) => util.restoreElementTabState(el),
      makeElementUntabbable: (el) => el.setAttribute('tabindex', -1),
      setBackgroundAttr: (attr, val) => document.querySelector(SCROLL_LOCK_TARGET).setAttribute(attr, val),
      setDialogAttr: (attr, val) => this.root_.setAttribute(attr, val),
      getFocusedElement: () => document.activeElement,
      setFocusedElement: (target) => target.focus(),
      acceptAction: () => {},
      cancelAction: () => {},
    });
  }
}
