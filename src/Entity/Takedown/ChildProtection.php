<?php

namespace App\Entity\Takedown;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use GeoSocio\EntityAttacher\Annotation\Attach;
use GeoSocio\EntityUtils\ParameterBag;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity
 * @ORM\Table(name="takedown_cp")
 *
 * @@todo add validation.
 */
class ChildProtection {

	/**
	 * @var Takedown
	 *
	 * @ORM\Id
	 * @ORM\OneToOne(targetEntity="App\Entity\Takedown\Takedown", inversedBy="cp")
	 * @ORM\JoinColumn(name="takedown_id", referencedColumnName="takedown_id")
	 */
	private $takedown;

	/**
	 * @var bool
	 *
	 * @ORM\Column(name="approved", type="boolean", options={"default"=false})
	 */
	private $approved;

	/**
	 * @var User
	 *
	 * @ORM\ManyToOne(targetEntity="App\Entity\User", cascade={"persist"})
	 * @ORM\JoinColumn(name="approver", referencedColumnName="user_id")
	 * @Attach()
	 */
	private $approver;

	/**
	 * @var string
	 *
	 * @ORM\Column(name="denied_approval_reason", type="string", length=255, nullable=true)
	 */
	 private $deniedApprovalReason;

	 /**
	 * @var \DateTimeInterface
	 *
	 * @ORM\Column(name="sent", type="datetime", nullable=true)
	 */
	private $accessed;

	/**
	 * Takedown
	 *
	 * @param array $data Data to construct the object.
	 */
	public function __construct( array $data = [] ) {
		$params = new ParameterBag( $data );
		$this->takedown = $params->getInstance( 'takedown', Takedown::class, new Takedown() );
		$this->approved = $params->getBoolean( 'approved', false );
		$this->approver = $params->getInstance( 'approver', User::class );
	}

	/**
	 * Set Takedown
	 *
	 * @param Takedown $takedown Takedown
	 *
	 * @return self
	 */
	public function setTakedown( Takedown $takedown ) : self {
		$this->takedown = $takedown;

		return $this;
	}

	/**
	 * Get Takedown
	 *
	 * @return Takedown
	 */
	public function getTakedown() :? Takedown {
		return $this->takedown;
	}

	/**
	 * Approved
	 *
	 * @Groups({"api"})
	 *
	 * @return bool
	 */
	public function isApproved() : bool {
		return $this->approved;
	}

	/**
	 * Set Approved
	 *
	 * @Groups({"api"})
	 *
	 * @param bool $approved Approved
	 *
	 * @return self
	 */
	public function setApproved( bool $approved ) : self {
		$this->approved = $approved;

		return $this;
	}

	/**
	 * Approver
	 *
	 * @return User
	 */
	public function getApprover() :? User {
		return $this->approver;
	}

	/**
	 * Set Approver
	 *
	 * @param User $approver Approver
	 *
	 * @return self
	 */
	public function setApprover( User $approver ) : self {
		$this->approver = $approver;

		return $this;
	}

	/**
	 * Approver Ids
	 *
	 * @Groups({"api"})
	 *
	 * @return User
	 */
	public function getApproverId() :? int {
		if ( $this->approver ) {
			return $this->approver->getId();
		}

		return null;
	}

	/**
	 * Set Approver Name
	 *
	 * @Groups({"api"})
	 *
	 * @param string $approverName Approver Name.
	 *
	 * @return User
	 */
	public function setApproverName( string $approverName ) : self {
		$this->approver = new User( [
			'username' => $approverName,
		] );

		return $this;
	}

	/**
	 * Approver Name
	 *
	 * @Groups({"api"})
	 *
	 * @return int
	 */
	public function getApproverName() :? string {
		if ( $this->approver ) {
			return $this->approver->getUsername();
		}

		return null;
	}

	/**
	 * Set Denied Approval Reason
	 *
	 * @Groups({"api"})
	 *
	 * @param string $deniedApprovalReason Denied Approval Reason
	 *
	 * @return self
	 */
	public function setDeniedApprovalReason( string $deniedApprovalReason ) : self {
		$this->deniedApprovalReason = $deniedApprovalReason;

		return $this;
	}

	/**
	 * Denied Approval Reason
	 *
	 * @Groups({"api"})
	 *
	 * @return string
	 */
	public function getDeniedApprovalReason() :? string {
		return $this->deniedApprovalReason;
	}

	/**
	 * Set sent
	 *
	 * @Groups({"api"})
	 *
	 * @param \DateTimeInterface $accessed The Accssesed DateTime.
	 *
	 * @return self
	 */
	public function setAccessed( \DateTimeInterface $accessed ) : self {
		$this->accessed = $accessed;

		return $this;
	}

	/**
	 * Sent
	 *
	 * @Groups({"api"})
	 *
	 * @return \DateTime
	 */
	public function getAccessed() :? \DateTimeInterface {
		return $this->accessed;
	}
}
