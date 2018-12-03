import React from "react";
import Modal from "react-modal";
import { offWhite } from "../../assets/colors";

Modal.setAppElement("#root");

const TosModal = (props) => (
  <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={() => props.closeModal()}
    style={{
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      content: {
        padding: 0,
        margin: 0,
        zIndex: 10000
      }
    }}
  >
    <div
      css={`
        background-color: ${offWhite};
        text-align: center;
        padding: 20px 0;
        width: 100%;
        font-weight: 600;
        font-family: "Encode Sans", sans-serif !important;
      `}
    >
      QHacks Terms and Conditions
      <img
        src="../../assets/img/times.svg"
        css="
            max-height: 40px;
            max-width: 40px;
            float: right;
            margin-right: 24px;
            cursor: pointer;
          "
        onClick={props.closeModal}
      />
    </div>
    <div
      css={`
        font-family: "Encode Sans", sans-serif !important;
        padding: 40px;
        p {
          margin: 7px 0 14px;
          padding: 0;
          line-height: 20px;
          font-size: 15px;
        }
        h3 {
          margin-top: 25px;
        }
      `}
    >
      <h3>1. Terms</h3>
      <p>
        These Website Standard Terms And Conditions (these “Terms” or these
        “Website Standard Terms And Conditions”) contained herein on this
        webpage, shall govern your use of this website, including all pages
        within this website (collectively referred to herein below as this
        “Website”). These Terms apply in full force and effect to your use of
        this Website and by using this Website, you expressly accept all terms
        and conditions contained herein in full. You must not use this Website,
        if you have any objection to any of these Website Standard Terms And
        Conditions.
      </p>
      <h3>2. Use License</h3>
      <p>
        Permission is granted to temporarily download one copy of the materials
        (information or software) on QHacks&apos; website for personal,
        non-commercial transitory viewing only. This is the grant of a license,
        not a transfer of title, and under this license you may not: modify or
        copy the materials, use the materials for any commercial purpose, or for
        any public display (commercial or non-commercial), attempt to decompile
        or reverse engineer any software contained on QHacks&apos; website,
        remove any copyright or other proprietary notations from the materials,
        transfer the materials to another person or "mirror" the materials on
        any other server.
      </p>
      <p>
        This license shall automatically terminate if you violate any of these
        restrictions and may be terminated by QHacks at any time. Upon
        terminating your viewing of these materials or upon the termination of
        this license, you must destroy any downloaded materials in your
        possession whether in electronic or printed format.
      </p>
      <h3>3. Disclaimer</h3>
      <p>
        The materials on QHacks&apos; website are provided on an &lsquo;as
        is&rsquo; basis. QHacks makes no warranties, expressed or implied, and
        hereby disclaims and negates all other warranties including, without
        limitation, implied warranties or conditions of merchantability, fitness
        for a particular purpose, or non-infringement of intellectual property
        or other violation of rights.
      </p>
      <p>
        Further, QHacks does not warrant or make any representations concerning
        the accuracy, likely results, or reliability of the use of the materials
        on its website or otherwise relating to such materials or on any sites
        linked to this site.
      </p>
      <h3>4. Limitations</h3>
      <p>
        In no event shall QHacks or its suppliers be liable for any damages
        (including, without limitation, damages for loss of data or profit, or
        due to business interruption) arising out of the use or inability to use
        the materials on QHacks&apos; website, even if QHacks or a QHacks
        authorized representative has been notified orally or in writing of the
        possibility of such damage. Because some jurisdictions do not allow
        limitations on implied warranties, or limitations of liability for
        consequential or incidental damages, these limitations may not apply to
        you.
      </p>
      <h3>5. Accuracy of Materials</h3>
      <p>
        The materials appearing on QHacks&apos; website could include technical,
        typographical, or photographic errors. QHacks does not warrant that any
        of the materials on its website are accurate, complete or current.
        QHacks may make changes to the materials contained on its website at any
        time without notice. However QHacks does not make any commitment to
        update the materials.
      </p>
      <h3>6. Links</h3>
      <p>
        QHacks has not reviewed all of the sites linked to its website and is
        not responsible for the contents of any such linked site. The inclusion
        of any link does not imply endorsement by QHacks of the site. Use of any
        such linked website is at the user&apos;s own risk.
      </p>
      <h3>7. Modifications</h3>
      <p>
        QHacks may revise these terms of service for its website at any time
        without notice. By using this website you are agreeing to be bound by
        the then current version of these terms of service.
      </p>
      <h3>8. Governing Law</h3>
      <p>
        These terms and conditions are governed by and construed in accordance
        with the laws of Canada and you irrevocably submit to the exclusive
        jurisdiction of the courts in that State or location.
      </p>
    </div>
  </Modal>
);

export default TosModal;
